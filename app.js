

$(document).ready(function () {

  
  getpokemones("https://pokeapi.co/api/v2/pokemon")
  
  $('#more-pokemons').click(function(){ 
    getpokemones(this.dataset.next)
    
  })
  
  $('.listado-pok').click(function(event){ 
    
    if(event.target.dataset.name){
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


  $('#pokeTypes').click(function(event){ 
    
    if(event.target.dataset.damage){
      let url_damage = event.target.dataset.damage
    
      getDamage(url_damage) 
 
    }
    
  })

  $('#pokeAbilities').click(function(event){ 
    
    if(event.target.dataset.ability && event.target.dataset.pokemon){
      let url_ability = event.target.dataset.ability
      let poke_name = event.target.dataset.pokemon
      
      $('#pokemon-with-ability').html('')
    
      
      getAbility(url_ability, poke_name) 
 
    }
    
  })

  



});



function getDataPokemon(pokemon_url){
  
  fetch(pokemon_url)
  .then(function(response){
    return response.json()
  })
  .then (function(data){
    
    
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
      $('#pokeTypes').append('<div id="typo" class="mr-2 tooltip-test" title="Daño a enemigos" >'+getTypes(types.type.name)+'<a class="ml-2 mr-4 rel-damage " href="" data-toggle="modal" data-target="#typeModal" data-damage="'+types.type.url+'">Relaciones de Daño</a></div>')
      
    })
    
    data.abilities.forEach(function(category){
      
      $('#pokeAbilities').append('<li>'+capitalize(category.ability.name)+'</li>')
      $('#pokeAbilities').append('<a class="ml-2 mr-4 rel-ability " href="" data-toggle="modal" data-target="#abilityModal" data-ability="'+category.ability.url+'" data-pokemon ="'+data.name+'">Otros Pokemones</a>')
      
    })
    
    
    $('#pokeImage').append('<img src="'+data['sprites']['other']['official-artwork']['front_default']+'" alt="" class="img-fluid image-modal">')
    
    
    
    
    
    fetch("http://pokeapi.co/api/v2/pokemon-species/" + ids)
                  .then(function(result){
                    return result.json()
                  })
                  .then(function(info){
      
                      info.flavor_text_entries.slice(-5).forEach(function(element){
                        if(element.language.name == "en"){ $('#pokeDescription').append('<h4 class="description-modal">'+element.flavor_text+'</h4>')}
                        return
                      });
                      
                      //console.log(info.generation)
                      $('#pokeGenerations').append('<div>'+info.generation.name+'</div>')
                      
                    
                      })


                      
                    })

    
  
  


}





function getpokemones(url){
  
  fetch(url)
            .then(function(response){
              return response.json()
            })
            .then(function(data){

              data.results.forEach(function(pokemon){  
                addPokemon(pokemon)
              })    
              $('#more-pokemons').attr('data-next', data.next)
              

            })

  
}
function addPokemon(pokemon){
  let id = 0
  let image_svg = "#"
  let description= "Blank description"
  
 
  fetch(pokemon.url)
        .then(function(response){
          return response.json()
        })
        .then(function(images){
          id=images.id
          image_svg = images.sprites.other.dream_world.front_default
          getDescription(id, image_svg, pokemon)
        })

  
}



function getDescription(id, image_svg, pokemon){


          fetch("http://pokeapi.co/api/v2/pokemon-species/" + id)
                                  .then(function(response){
                                      return response.json()
                                  })
                                  .then(function(info){


                                    info.genera.forEach(function(element){
                                      if(element.language.name == "en"){ 
                                        description = element.genus;
                                        //console.log(description)
                                        
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
                                          
                                          
                                        }
                                        
                                      });



                                  })
  
 
  
}



const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
} 




function getDamage(url){

          fetch(url)
                    .then(function(response){
                      return response.json()
                    })
                    .then(function(data){
                      let relations = data.damage_relations
                      
                      cleanInfo()

                      PrintDamage(relations.double_damage_to,'#DoubleDamageTo')
                      PrintDamage(relations.double_damage_from,'#DoubleDamageFrom')
                      PrintDamage(relations.half_damage_to,'#HalfDamageTo')
                      PrintDamage(relations.half_damage_from,'#HalfDamageFrom')
                      PrintDamage(relations.no_damage_from,'#NoDamageFrom')
                      PrintDamage(relations.no_damage_to,'#NoDamageTo')
                      





                    })
                      
}

function PrintDamage(route,id_html){

    route.forEach(function(damage){
     
        
        $(id_html).append('<li id="typo" class="mr-2 tooltip-test" title="Daño a enemigos" >'+damage.name+'</li>')

      
      
    
    }) 
}

 function getAbility(url, name){
      fetch(url)
                .then(function(response){
                  return response.json()
                  
                })
                .then(function(data){
                  
                  data.pokemon.forEach(function(pokemon){
                    let arr_pokemon = pokemon.pokemon.name
                    if(arr_pokemon === name) {
                      $('#pokemon-with-ability').append('<div id="typo" class="mr-2" ></div>')
                    }else {
                      $('#pokemon-with-ability').append('<li id="typo" class="mr-2" >'+arr_pokemon+'</li>')
                    }

                    
                  })


                })
}

function cleanInfo(){
  $('#DoubleDamageTo').html('')
  $('#DoubleDamageFrom').html('')
  $('#HalfDamageTo').html('')
  $('#HalfDamageFrom').html('')
  $('#NoDamageFrom').html('')
  $('#NoDamageTo').html('')
          
}