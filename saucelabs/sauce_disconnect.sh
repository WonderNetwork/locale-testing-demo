#!/usr/bin/env bash

saucedir="/tmp/sauce-connect"

# set up one sauce tunnel for each server passed on the command line
for server; do
    pidfile=$saucedir/$server.pid

    if [ -f "$pidfile" ]; then
        pid=`cat "$pidfile"`
        echo Killing Sauce Connect tunnel for $server, PID $pid

        kill $pid
        while [ -e /proc/$pid ]; do
            sleep 0.1
        done

        rm $saucedir/$server.*
    else
        echo $pidfile does not exist, skipping
        continue
    fi
done
