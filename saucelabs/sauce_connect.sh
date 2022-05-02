#!/usr/bin/env bash

set -eo pipefail

# check for servers
if [[ -z "$@" ]]; then
    echo "You need to specify one or more WonderProxy server names"
    exit 4
fi

# check for sauce creds
if [[ -z "$SAUCE_USERNAME" || -z "$SAUCE_ACCESS_KEY" ]]; then
    echo "You need to set SAUCE_USERNAME and SAUCE_ACCESS_KEY"
    exit 1
fi

# check for wonderproxy creds
if [[ -z "$WONDERPROXY_USER" || -z "$WONDERPROXY_TOKEN" ]]; then
    echo "You need to set WONDERPROXY_USER and WONDERPROXY_TOKEN"
    exit 2
fi

# check for the sc binary
if [[ -z $(which sc) ]]; then
    echo "Can't find the Sauce Connect binary (sc), make sure it's in your PATH"
    exit 3
fi

# starting ports for sauce connect tunnels, incremented by one for each
# tunnel started
scport=56692 # --scproxy-port
seport=4445  # --se-port

# set up the temp directory
saucedir="/tmp/sauce-connect"
mkdir -p "$saucedir"

# set up one sauce tunnel for each server passed on the command line
for server; do
    printf "\n"
    pidfile="$saucedir/$server.pid"

    # clean up old tunnels
    if [[ -f "$pidfile" ]]; then
        echo You already have a tunnel running for $server. \
            The PID is "$(cat "$pidfile")".
        continue
    fi
    rm -f "$saucedir/$server".*

    echo Starting a Sauce Connect tunnel for $server in the background. Check \
        "$saucedir/$server".* for logs and output.

    sc \
       -u "$SAUCE_USERNAME" -k "$SAUCE_ACCESS_KEY" \
       -p "$server.wonderproxy.com:11000" \
       -w "$WONDERPROXY_USER:$WONDERPROXY_TOKEN" \
       -l "$saucedir/$server.log" -i "$server" \
       --pidfile "$pidfile" \
       --scproxy-port "$scport" -P "$seport" \
       --region us-west \
       > "$saucedir/$server.output.log" 2>&1 &

    seconds=0
    while [[ "$seconds" -lt 50 && ! -f "$pidfile" ]]; do
        let "seconds += 1"
        sleep .1
    done

    if [[ -f "$pidfile" ]]; then
        echo When you are ready to stop the $server tunnel, kill "$(cat "$pidfile")"
    else
        echo WARNING: The PID file for $server was not created, check the logs
    fi

    let "scport += 1"
    let "seport += 1"
done

printf "\n"

# check for the tunnels to actually be ready. minor details.
echo Tunnels are spinning up, this may take a few seconds...
seconds=0
servers_done=""
in_progress=true
while [[ "$seconds" -lt 75 && $in_progress ]]; do
    in_progress=
    let "seconds += 1"
    printf "."

    for server; do
        log="$saucedir/$server.output.log"
        if [[ ! "$servers_done" =~ [[:space:]]$server[[:space:]] ]]; then
            if grep -q 'Sauce Connect is up' "$log"; then
                servers_done="$servers_done $server "
            else
                in_progress=true
            fi
        fi
    done

    sleep 1
done

printf "\n"
for server; do
    if [[ "$servers_done" =~ [[:space:]]$server[[:space:]] ]]; then
        echo $server is ready
    else
        echo WARNING: Sauce Connect tunnel for $server is not ready, check the logs
    fi
done
