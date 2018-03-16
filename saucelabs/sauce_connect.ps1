# check for servers
if ($args.count -eq 0) {
    "Specify one or more WonderProxy server names"
    exit 4
}

# check for sauce creds
if (!$env:sauce_username -or !$env:sauce_access_key) {
    "Set SAUCE_USERNAME and SAUCE_ACCESS_KEY in your environment variables"
    exit 1
}

# check for wonderproxy creds
if (!$env:wonderproxy_user -or !$env:wonderproxy_pass) {
    "Set WONDERPROXY_USER and WONDERPROXY_PASS in your environment variables"
    exit 2
}

# starting ports for sauce connect tunnels, incremented by one for each 
# tunnel started
# https://docs.saucelabs.com/reference/sauce-connect/#on-the-same-machine
$scport = 56692 # --scproxy-port
$seport = 4445  # --se-port

$saucedir = join-path "$env:temp" "sauce-connect"
md "$saucedir" -ea 0 |out-null

foreach ($server in $args) {
    "`n"
    $pidfile = join-path "$saucedir" "$server.pid"
    $logfile = join-path "$saucedir" "$server.log"
    $processlog = join-path "$saucedir" "$server"

    if (test-path "$pidfile") {
        "You already have a tunnel running for $server. The PID is $(cat "$pidfile")."
        continue
    }
    rm -force (join-path "$saucedir" "$server.*")

    "Starting a Sauce Connect tunnel for $server in the background. Check $(join-path "$saucedir" "$server.*") for logs and output."

    start-process -filepath (join-path $pwd "sc.exe") `
        -nonewwindow `
        -redirectstandardoutput "$processlog.out.log" `
        -redirectstandarderror "$processlog.error.log" `
        -argumentlist "-u $env:sauce_username -k ""$env:sauce_access_key"" -p ""$server.wonderproxy.com:11000"" -w ""$($env:wonderproxy_user):$($env:wonderproxy_pass)"" -l ""$logfile"" -i $server --pidfile ""$pidfile"" --scproxy-port $scport -P $seport"

    $seconds = 0
    while (($seconds -lt 5000) -and !(test-path "$pidfile")) {
        $seconds = $seconds + 100
        start-sleep -milliseconds 100
    }

    if (test-path "$pidfile") {
        "When you are ready to stop the $server tunnel, kill $(cat "$pidfile")"
    } else {
        "WARNING: The PID file for $server was not created, check the logs"
    }

    $scport += 1
    $seport += 1
}

""
"Tunnels are spinning up, this may take a few seconds..."

$seconds = 0
$servers_done = @()
$in_progress = $true
while ($seconds -lt 75 -and $in_progress) {
    $in_progress = $false
    $seconds += 1

    write-host -nonewline "."

    foreach ($server in $args) {
        $log = join-path "$saucedir" "$server.log"
        if (!($servers_done -eq $server)) {
            if (select-string -path "$log" -pattern "Sauce Connect is up") {
                $servers_done += $server
            } else {
                $in_progress = $true
            }
        }
    }

    start-sleep -seconds 1
}

""

foreach ($server in $args) {
    if ($servers_done -eq $server) {
        "$server is ready"
    } else {
        "WARNING: Sauce Connect tunnel for $server is not ready, check the logs"
    }
}
