#!/bin/bash
npm run dev & 
P1=$!
npm --prefix ./client run serve
P2=$!
wait $P1 $P2
exit 0

