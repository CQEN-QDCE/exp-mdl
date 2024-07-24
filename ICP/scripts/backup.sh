#!/bin/bash

HOME="</home/dir/a/la/racine/du/projet>"
PKI_ROOT="$HOME/icpGouvQc"
BKP_ROOT="$HOME/bkp_pki_cqen"

mkdir -p $BKP_ROOT/ca/root/config
mkdir -p $BKP_ROOT/ca/cqen/config
mkdir -p $BKP_ROOT/ca/saaq/config
mkdir -p $BKP_ROOT/scripts

cp -r $PKI_ROOT/ca/root/config $BKP_ROOT/ca/root/
cp -r $PKI_ROOT/ca/cqen/config $BKP_ROOT/ca/cqen/
cp -r $PKI_ROOT/ca/saaq/config $BKP_ROOT/ca/saaq/
cp -r $PKI_ROOT/ca/root/scripts $BKP_ROOT/ca/root/
cp -r $PKI_ROOT/ca/cqen/scripts $BKP_ROOT/ca/cqen/
cp -r $PKI_ROOT/ca/saaq/scripts $BKP_ROOT/ca/saaq/
cp -r $PKI_ROOT/scripts $BKP_ROOT

#EOF
