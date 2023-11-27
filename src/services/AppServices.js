import axios from "axios";
import { environment } from "../Router/environments/environments";

const getProducts=async(data)=>{
    
    /* PRODUCTS */
    let path=environment.api+environment.productos

    /* BODY */

    let body={
        "nit_del_cliente": data.Nit,
        "departamento": data.Departamento == "" ||  data.Departamento == '' ?  null : data.Departamento,
        "ciiu":  data.Ciuu == "" ||  data.Ciuu == '' ?  null : data.Ciuu,
        "seccion":data.client_section == "" ||  data.client_section == '' ?  null : data.client_section,
        "producto_1": null,
        "producto_2": null,
        "producto_3": null,
        "producto_4": null,
        "producto_5": null,
        "producto_6": null,
        "producto_7": null,
        "producto_8": null,
        "producto_9": null,
        "producto_10":null,
        "producto_11": null,
        "producto_12": null,
        "producto_13": null,
        "producto_14": null,
        "producto_15": null
    }
    for (var i=0; i<data.products.length;i++){
        let string = 'producto_'+(i+1).toString()
        body[string] = data.products[i].code;
    }

    console.log("LO QUE SE ENVIA: ",body);
    body= eliminarNulos(body)
    return await axios.post(path,body)

}


const getPrice=async(d,data,type)=>{
    
    /* PRODUCTS */
    let path=environment.api+environment.precios

    /* BODY */
    // un producto
    let body;
    if (type =='product'){
        body={
            "opcion_seleccionada": d.calculate,
            "opcion_seleccionada_tipo_iteraccion": d.iterate,
            'Codigo_Tornillo':data.code,
            'Descuento':data.descuento == '' || data.descuento == "" ? null : data.descuento,
            'Pareto' : d.pareto,
            'Nit' : data.nit,
            'tipo_calculo':d.tipo_calculo,
            'Umbral_Iteracciones': data.umbral,

        }
    }else{
        body={
            'grupo':data.code_group,
            'subgrupo':data.code_Subgroup,
            'Descuento':data.descuento == '' || data.descuento == "" ? null : data.descuento,
            'Pareto' : d.pareto,
            'Nit' : data.nit,
            'tipo_calculo':d.tipo_calculo,
            'Umbral_Iteracciones': data.umbral,
            "opcion_seleccionada": d.calculate,
            "opcion_seleccionada_tipo_iteraccion": d.iterate
        }
    }
    // familia 
    
    

    body= eliminarNulos(body)
    console.log(body);
    return await axios.post(path,body)

}

function eliminarNulos(objeto) {
    for (let clave in objeto) {
      if (objeto[clave] === null) {
        delete objeto[clave];
      } else if (typeof objeto[clave] === 'object') {
        eliminarNulos(objeto[clave]);
      }
    }
    return objeto;
}

export {getProducts,getPrice}