#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
PKI_ROOT="$HOME/icpGouvQC"
BKP_ROOT="$HOME/bkp_pki_cqen"

cp -r $BKP_ROOT/ca/root/config/* $PKI_ROOT/ca/root/config/.
cp -r $BKP_ROOT/ca/cqen/config/* $PKI_ROOT/ca/cqen/config/.
cp -r $BKP_ROOT/ca/saaq/config/* $PKI_ROOT/ca/saaq/config/.

cp -r $BKP_ROOT/ca/root/scripts/* $PKI_ROOT/ca/root/scripts/.
cp -r $BKP_ROOT/ca/cqen/scripts/* $PKI_ROOT/ca/cqen/scripts/.
cp -r $BKP_ROOT/ca/saaq/scripts/* $PKI_ROOT/ca/saaq/scripts/.

cp -r $BKP_ROOT/scripts/* $PKI_ROOT/scripts/.

#EOF
