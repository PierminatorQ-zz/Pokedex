function getTypes(type){
    let result= "normal"
  //console.log(type)
  switch (type){
    case "steel":
      result = '<img src="img/Tipo_acero.png" alt="">'
      break;
    case "water":
      result = '<img src="img/Tipo_agua.png" alt="">'
      break;
    case "bug":
      result = '<img src="img/Tipo_bicho.png" alt="">'
      break;
    case "dragon":
      result = '<img src="img/Tipo_dragon.png" alt="">'
      break;
    case "electric":
      result = '<img src="img/Tipo_electrico.png" alt="">'
      break;
    case "ghost":
      result = '<img src="img/Tipo_fantasma.png" alt="">'
      break;
    case "fire":
      result = '<img src="img/Tipo_fuego.png" alt="">'
      break;
    case "fairy":
      result = '<img src="img/Tipo_hada.png" alt="">'
      break;
    case "ice":
      result = '<img src="img/Tipo_hielo.png" alt="">'
      break;
    case "fighting":
      result = '<img src="img/Tipo_lucha.png" alt="">'
      break;
    case "normal":
      result = '<img src="img/Tipo_normal.png" alt="">'
      break;
    case "grass":
      result = '<img src="img/Tipo_planta.png" alt="">'
      break;
    case "psychic":
      result = '<img src="img/Tipo_psiquico.png" alt="">'
      break;
    case "rock":
      result = '<img src="img/Tipo_roca.png" alt="">'
      break;
    case "dark":
      result = '<img src="img/Tipo_siniestro.png" alt="">'
      break;
    case "ground":
      result = '<img src="img/Tipo_tierra.png" alt="">'
      break;
    case "poison":
      result = '<img src="img/Tipo_veneno.png" alt="">'
      break;
    case "flying":
      result = '<img src="img/Tipo_volador.png" alt="">'
      break;
    default:
      result = '<img src="img/Tipo_incognito.png" alt="">'
      break;
  }
  
    return result
}