# oc process -f ../../../aries-toolkit/openshift/templates/issuer/aries-issuer.yaml --param-file=agent/aries-issuer.candy-dev.params.env | oc apply -f -

# oc process -f ../../../aries-toolkit/openshift/templates/issuer/aries-issuer.yaml --param-file=agent/aries-issuer.candy-dev.params.env 

oc process -f ./pki-cqen.yaml | oc apply -f -
