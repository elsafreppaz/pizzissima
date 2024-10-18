document.addEventListener("DOMContentLoaded", (event) => {


    // VARIABLES_______________________________________________
    let userAge = 20;
    let legalAge = 18;
    let name = "Elsa";

    // Objet
    let animal = {
        nbPaws: 4,
        nameAnimal: "Sunny",
        animalType: "chat"
    };

    // Pour afficher un index du tableau : cosole.log(tableau[index])
    console.log(userAge, legalAge, name);
    console.log(animal.nbPaws); //Pour voir une ctn propriété de l'objet


    //Modifier les variables
    console.log(userAge);
    userAge = userAge + 1; // ou userAge +=1;
    console.log(userAge);

    //Concaténation
    let text = "L'utilisateur s'appelle " + name + " et a " + userAge + " ans.";
    console.log(text);

    //Gabarits de texte
    let text2 = `Elle a un ${animal.animalType} qui s'appelle ${animal.nameAnimal}.`
    console.log(text2);

    // CONDITIONS_______________________________________________
    // cf opérateurs de conditions

    console.log(userAge)

    if (userAge >= legalAge) //supérieur ou égal
    {
        console.log(name + " est majeur(e)");
    }
    else {
        console.log(name + " est mineur(e), il a " + userAge);
    }

    userAge = userAge - 10;


    if (userAge >= legalAge) //supérieur ou égal
    {
        console.log(name + " est majeur(e)");
    }
    else {
        console.log(name + " est mineur(e), il/elle a " + userAge + " ans.");
    }


    // BOUCLES_____________________________________________
    let tableau = [21, 12, 4, 77, 8, 18];
    let i;


    //parcourir un tableau

    for (i = 0; i < tableau.length; i++) // i valeur générique d'indice
    {
        if (tableau[i] >= legalAge) {
            console.log("Il/elle a " + tableau[i] + " ans. Il/elle est majeur(e)");
        }
        else {
            console.log("Il/elle a " + tableau[i] + " ans. Il/elle est mineur(e)");
        }

    }


    let age = 0;
    while (age < legalAge) {
        console.log("Attends un peu ! Tu as seulement " + age + " ans");
        age += 2;
    }

    console.log("Tu es majeur maintenant !");



    // FONCTIONS_____________________________________________

    let wallet = 0;

    function transaction(amount, quoef) {
        wallet += amount * quoef;
        if (wallet <= 0) {
            console.log("VOUS ÊTES DANS LE ROUGE ! Vous avez effectué une transaction de " + amount * quoef + "€. Vous avez échangé " + amount + "€ avec une taxe d'indice " + quoef + ". Votre solde s'élève donc à " + wallet + "€.");
        }
        else {
            console.log("Vous êtes dans le positif ! Vous avez effectué une transaction de " + amount * quoef + "€. Vous avez échangé " + amount + "€ avec une taxe d'indice " + quoef + ". Votre solde+0 s'élève donc à " + wallet + "€.")
        }
    }

    transaction(10, 3);
    transaction(-9, 2);



    // let test = document.getElementById("test");
    // let test2 = document.getElementsByClassName("test2");
    // let pizza = document.getElementsByTagName("img"); // je cible l'élément, je le mets dans une variable 
    // pizza.classList.add("pizz"); //Je lui ajoute une nouvelle class

    // console.log(test);
    // console.log(test2);
    // console.log(pizza); 

    //Parcourir les class et en ajouter une à certaines class spécifiques


    let ingredient = document.getElementsByClassName("ingredient");

    let index = 0;

    console.log(ingredient);

    for (index = 0; index < ingredient.length; index++) {
        if (ingredient[index].classList.contains("basil")) //si dans mon tableau[l'élément]à une classe qui contient ("basil")
        {
            ingredient[index].classList.add("miam"); //ajouter une class
            ingredient[index].style.filter = "grayscale(100%)"; //modifier/ajouter du style
        }
        // ingredient[index].style.backgroundColor = "black";
    }

    let score = 60;
    document.getElementsByClassName("scoreDisplay")[0].innerHTML = "Score : " + score;



});

