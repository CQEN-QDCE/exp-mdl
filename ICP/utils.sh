# Fonction pour faire display dans le terminal avec des couleurs. 
# Le code de couleur est representé dans le fichier base.params. Vérifiez-le pour avoir le code à utiliser avec le message.  
echolor(){
    color=$1
    message=$2
    echo -e "\033[${color}m${message}\033[${COLOR_RESET}m"
}