#!/bin/bash

curl http://colinm.org/language_checklist.html | jquery '$("pre")' | less
