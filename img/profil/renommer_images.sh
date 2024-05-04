for file in uifaces*.jpg; do
    number=$(echo "$file" | grep -o '[0-9]\+')
    mv "$file" "profil$number.jpg"
done
