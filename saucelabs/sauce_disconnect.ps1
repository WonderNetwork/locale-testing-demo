$saucedir = join-path "$env:temp" "sauce-connect"

foreach ($server in $args) {
    $pidfile = join-path "$saucedir" "$server.pid"

    if (test-path "$pidfile") {
        # $pid is a read-only shell constant! SURPRISE!
        $id = "$(cat "$pidfile")"
        "Killing Sauce Connect tunnel for $server, PID $id"

        stop-process -id $id -force
        wait-process -id $id -timeout 30
        start-sleep -seconds 1 # because otherwise we get errors about removeing the files?!
    } else {
        "No process ID found for $server"
    }

    rm -force (join-path "$saucedir" "$server.*")
}
