# Certificate issuance script, using the CSR generated file from the ECDSA-CSR folder.

ALIAS=$1

if [ -z "$ALIAS" ]; then
    echo "Error: Inform an alias for the certificate."
    exit 1
fi

echo $ALIAS 

cp csr/$ALIAS.csr ../../exp-mdl/pki-cqen/ACIntermediaire/ca/csr/.

# Certificate issuance
../../exp-mdl/pki-cqen/ACIntermediaire/usager.sh emettre $ALIAS

# Clean up 
rm -rf __pycache__/
