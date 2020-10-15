

$(document).ready(function () {
      getpokemones("https://pokeapi.co/api/v2/pokemon")
      
      $('#more-pokemons').click(function(){ 
        getpokemones(this.dataset.next)
        
      })

      $('.listado-pok').click(function(event){ 
        
        if(event.target.dataset.name){
          //console.log(event.target.dataset.name)
          let pokemon_url = event.target.dataset.pokeurl
          let pokemon_name = event.target.dataset.name
          $('#modalTitle').html(capitalize(pokemon_name))
          $('#pokeDescription').html('')
          $('#pokeAbilities').html('')
          $('#pokeTypes').html('')
          $('#pokeMoves').html('')
          $('#pokeGenerations').html('')
          $('#pokeHeight').html('')
          $('#pokeWeight').html('')
          $('#pokeImage').html('')
          getDataPokemon(pokemon_url)
        }
        
      })
});


function getDataPokemon(pokemon_url){
  $.ajax(pokemon_url).done(function(data){
    
    let ids= data.id
    

    i=0
    data.moves.forEach(function(moviment){
      i++
      if( i<6){
        $('#pokeMoves').append('<li>'+moviment.move.name+'</li>')
      }
      
  })

  
    $('#pokeHeight').append('<div class="mr-2">'+data.height+'</div>')

    $('#pokeWeight').append('<div class="mr-2">'+data.weight+'</div>')


    data.types.forEach(function(types){
      $('#pokeTypes').append('<div class="mr-2">'+getTypes(types.type.name)+'</div>')
  })

    data.abilities.forEach(function(category){
        $('#pokeAbilities').append('<li>'+category.ability.name+'</li>')
    })

    console.log(data['sprites']['other']['official-artwork']['front_default'])
      $('#pokeImage').append('<img src="'+data['sprites']['other']['official-artwork']['front_default']+'" alt="" class="img-fluid image-modal">')
 




    /* let generations = data.sprites.versions
    Object.keys(generations).forEach(function(gen){
      $('#pokeGenerations').append('<li>'+gen+'</li>')
    }) */

    $.ajax("http://pokeapi.co/api/v2/pokemon-species/" + ids).done(function(info){

      info.flavor_text_entries.slice(-5).forEach(function(element){
        if(element.language.name == "en"){ $('#pokeDescription').append('<h4 class="description-modal">'+element.flavor_text+'</h4>')}
      return
      });

      console.log(info.generation)
      $('#pokeGenerations').append('<div>'+info.generation.name+'</div>')
      

    })
  })
}



function getpokemones(url){

    $.ajax(url).done(function(data){
      //console.log(data)  
        data.results.forEach(function(pokemon){
           
            addPokemon(pokemon)
        })    
        $('#more-pokemons').attr('data-next', data.next)
        
    })

}
function addPokemon(pokemon){
  let id = 0
  let image_svg = "#"
  let description= "Blank description "

  

  $.ajax(pokemon.url).done(function(images){ 
    id=images.id
    image_svg = images.sprites.other.dream_world.front_default
    
              
  
    $.ajax("http://pokeapi.co/api/v2/pokemon-species/" + id).done(function(info){
    
      info.genera.forEach(function(element){
          if(element.language.name == "en"){ description = element.genus;}
        });
    
        
      


 
    $('.listado-pok').append(
      
      '<div class=" col-xs-12 col-sm-3 mb-3">'+
      '<div class="card text-center h-100 d-flex">'+
      '<img src="'+image_svg+'" class="card-img-top pokeImage img-fluid" alt="..."></img>'+
        '<div class="card-body">'+
          '<h5 class="card-title">'+ capitalize(pokemon.name)+'</h5>'+
          '<hr>'+
          '<h6 class="card-subtitle mb-3 text-muted">'+description+'</h6>'+
          '<a href="#" class="btn btn-pokemon btn-outline-warning text-center" data-toggle="modal" data-pokeurl="'+pokemon.url+'" data-target="#pokeModal" data-name="'+pokemon.name+'">Ver màs</a>'+
          
        '</div>'+
        '</div>'+
      '</div>'
      
    )

    })

  })

  
    



}



            

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
} 