####This web was created using SASS as a CSS compiler, to work in a more organized way.

####The scripts are all vanilla JavaScript.
Used for:
  => Conecting the PokeApi to the site, creating a PokeDex that let you create a team.
      => Create a Pokemon card.
          => Render the information about the Pokemon and a Image of it.
          => Render the types.
          => Render the stats.
          => Adding a button that clone a node and render it in another section of the site.
          => Adding functions to determine if the team has empty space, if not you can't add another Pokemon.
              => Adding alert messages that checks the status of this addition.
              
  => Adding scroll events to links and buttons.
  => Adding a phone hamburguer menu
  => Usage of classes 
      => Create a Pokemon object with a Name and id, adding it to an array witch I use to track which Pokemon is the one added to the team, later deleting it from the array and the DOM using the id.
      => Create a dynamic message string with Message.create method, taking the data from the object properties, that use HTML syntax to append it with insertAdjacentHTML()
  

This project was created as a practice, in which I learned about using the data from the API to create an App and how to manage it.
