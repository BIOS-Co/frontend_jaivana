import React from 'react'
/* ESTILOS */
import './Products.css'
import Navigationbar from '../../Components/Navbar/Navbar'
import Imagen_3 from '../../img/Fondo_3.jpg';
/* FORM */

import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import Swal from 'sweetalert2';
import Preloader from '../../Components/Loading/Loading';
import { getProducts } from '../../services/AppServices';

const { NoOptionsMessage } = components;


const customNoOptionsMessage = props => (
  <NoOptionsMessage {...props} className="custom-no-options-message-auth-form-">No registrado</NoOptionsMessage>
);

const { LoadingMessage } = components;

const customLoadingMessage = props => (
  <LoadingMessage {...props} className="custom-loading-message-auth-form-">Cargando</LoadingMessage>
);

/**
 * ANIMATE DELETE MULTISELECT
 */

const animatedComponents = makeAnimated();

/**
 * Se genera componente nuevo para soportar el placeholder animado del input 
*/

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  const { inputId, placeholder } = props.selectProps;
  return (
    <ValueContainer {...props}>
      <Placeholder htmlFor={inputId} {...props}>
        {placeholder}
      </Placeholder>
      {React.Children.map(children, child =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const selectStyles = {
  /**
   * Estilos del icono del dropdown del select
   * Estilos del separador del select
   * Estilos del icono de cerrar del select
   */
  dropdownIndicator: (styles) => ({ ...styles, 
    color: "var(--color-tertiary-purple-)", 
    padding: 0, 
    paddingTop: '0.34rem !important', 
    paddingRight: '0.5rem !important',
    width: '25px',
    height: '25px',
    "&:hover": {
      color: "var(--color-tertiary-purple-)",
    }  
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
  clearIndicator: (styles) => ({ ...styles, 
    color: "var(--color-tertiary-purple-)", 
    padding: 0, 
    paddingTop: '0.05rem !important',
    width: '15px',
    height: '15px',
    "&:hover": {
      color: "var(--color-tertiary-purple-)",
    } 
  }),
  /**
   * ESTILOS DEL INPUT GLOBAL
   */
  control: () => ({
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    alignSelf: "start",
    justifyContent: "start",
    height: 'auto',
    minHeight: 50,
    maxHeight: 150,
    paddingLeft: '2.1rem',
    paddingTop: '0.3rem',
    width: "100%",
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderBottom: "1px solid var(--color-tertiary-purple-)",
  }),
  /**
  * ESTILOS DEL INPUT
  */
  input: (provided) => ({
  ...provided,
  color: 'var(--color-purple-)',
  fontSize: 12,
  textTransform: 'uppercase',
  fontFamily: 'var(--font-family-regular-)',
  }),
  /**
   * ESTILOS DEL MENU DESPLEGABLE DEL SELECT
   */
  menu: (styles) => ({
    ...styles,
    border: 'none',
    backgroundColor: 'var(--color-gray-rgba-)',
    boxShadow: 'var(--box-shadow-6-)',
    borderRadius: '0.8rem',
    padding: 0,
    marginTop: 8,
    marginBottom: 0,
    height: 'auto',
    minHeight: 'auto',
    maxHeight: 300,
    overflow: "hidden",
    color: 'var(--color-purple-)',
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: 'var(--font-family-regular-)',
  }),
  menuList: () => ({
    paddingTop: 0,
    paddingBottom: 0,
    height: 'auto',
    minHeight: 'auto',
    maxHeight: 300,
    overflow: "auto",
    "::-webkit-scrollbar": {
      width: "0px !important",
      height: "0px !important",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent !important"
    },
    "::-webkit-scrollbar-thumb": {
      background: "transparent !important"
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "transparent !important"
    }
  }),
  /**
   * ESTILOS DE LAS OPCIONES DESPLEGABLES
   */
  option: (provided, state) => ({
    ...provided,
    fontSize: 11,
    textTransform: "uppercase",
    backgroundColor: state.isSelected ? "var(--color-purple-)" : "var(--color-gray-rgba-)",
    fontFamily: 'var(--font-family-regular-)',
    padding: '0.5rem 0.8rem 0.5rem 0.8rem',
    borderRadius: '0.8rem',
    ":hover": {
      background: "var(--color-purple-)",
      color: 'var(--color-white-)',
    }
  }),
  /**
   * ESTILOS DEL CONTENEDOR
   */
  container: (provided, state) => ({
    ...provided,
    marginTop: 0,
    width: '100%',
    position: 'relative',
    flex: '1 1 auto'
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    overflow: "visible",
    position: "relative",
    top: "4px"
  }),
  /**
   * ESTILOS PLACEHOLDER DEL INPUT
   */
  placeholder: (provided, state) => ({
    ...provided,
    width: '100%',
    position: "absolute",
    top: state.hasValue || state.selectProps.inputValue ? -20 : "22%",
    left: state.hasValue || state.selectProps.inputValue ? -32 : "0%",
    transition: "top 0.1s, font-size 0.1s",
    color: 'var(--color-purple-)',
    fontSize: state.hasValue || state.selectProps.inputValue ? 13 : "14px",
    lineHeight: 1.25,
    fontFamily: 'var(--font-family-regular-)',
    overflow: 'hidden',
    textAlign: 'start',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }),
  /**
   * ESTILOS TEXTO EN EL INPUT
   */
  singleValue: (styles) => ({ 
    ...styles, 
    fontSize: 12,
    textTransform: 'uppercase',
    color: "var(--color-purple-)", 
    fontFamily: 'var(--font-family-regular-)', 
    paddingTop: '0.3rem',
    marginLeft: 0,
    marginRight: 0
  }),
  multiValue: (styles) => ({ 
    ...styles, 
    backgroundColor: 'var(--color-secondary-white-rgba-)',
    boxShadow: 'var(--box-shadow-2-)',
    borderRadius: '0.5rem',
    alignItems: 'center',
    alignSelf: 'center',
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    fontFamily: 'var(--font-family-regular-)',
    fontSize: 12,
    textTransform: 'uppercase',
    color: 'var(--color-quaternary-gray-)',
    paddingLeft: '0.5rem',
    paddingRight: '0.6rem',
    paddingBottom: '0.3rem'
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    borderRadius: '6rem',
    paddingLeft: '6px',
    width: '26px',
    height: '26px',
    color: 'var(--color-black-)',
    backgroundColor: 'var(--color-secondary-gray-)',
    ':hover': {
      color: 'var(--color-white-)',
      backgroundColor: 'var(--color-secondary-purple-)',
    }
  })
}

export default function Products() {

  /* PRELOADER */

  let [preloader,setPreloader]  = React.useState(false);

  /* USE STATES */
  
  let [data,setData] = React.useState({
    'Nit':"",
    'Departamento':"",
    'Ciuu':"",
    'client_section':"",
    'products':[]
  })

  /* input */

  const readInput=(event,type)=>{

    setData({...data,[type]:event.target.value})

  }

  const readSelect=(event,type)=>{

    if(event){

      setData({...data,[type]:event.value})

    }else{

      setData({...data,[type]:""})

    }

    

  }

  const AppendProduct=()=>{

    if(data?.products.length===15){

      Swal.fire({
          icon: 'info',
          text:"No puedes agregar más de 16 productos",
      })



    }else{

      let list = data.products
      list.push({'code':""})
      setData({...data,['products']:list})
    }


  }


  const deleteProduct=(ind)=>{

    let list = data.products.filter((obj,index)=>index !== ind)

    setData({...data,['products']:list});

  }

  const checkProducts=()=>{
    let filterArray = data.products.filter((obj)=>obj.code === "");
    if(filterArray.length !== 0){
      return true
    }else{
      return false
    }
  }

  const ReadInputTable=(event,index)=>{
    let List = data.products;

    List[index].code = event.target.value;
    
    setData({...data,['products']:List})
  }

  let [inferencia,setInferencia] = React.useState(null);

  let [inferencia_1,setInferencia_1] = React.useState(null);
  let [inferencia_2,setInferencia_2] = React.useState(null);
  const doInference=async()=>{

    /* INFERENCIA */

    setInferencia_1(null)
    setInferencia_2(null)

    let check = checkProducts();

    if(check){

      Swal.fire({
        icon: 'info',
        text:"Rellena el código del producto",
      })

    }else{

      if(data.Nit === ""){
        Swal.fire({
          icon: 'info',
          text:"Debe registrar el campo del nit",
        })
        setInferencia('ok');
      }else{
        // LLAMAMOS EL SERVICIO AQUI.
        console.log(data)
        let result =  undefined;
        setPreloader(true);
        result = await getProducts(data).catch((error)=>{
          setPreloader(false);
          console.log(error);
          Swal.fire({
            icon: 'info',
            text:"error al hacer inferencia",
          })
        })
        if(result){
          setPreloader(false);
          console.log("INFERENCIA: ",result.data)
          // MIRAMOS TODOS LOS CASOS POSIBLES
          let inferencia1 = result.data[0] // obtenemos el objeto
          let inferencia2 = result.data[1] // obtenemos el objeto
          if (inferencia1[0]['Observacion'] !== undefined){

            Swal.fire({
              icon: 'info',
              text:inferencia1[0]['Observacion'],
            }).then(result => {
              if (result.isConfirmed) {
                // miramos la otra alerta
                if (inferencia2[0]['Observacion'] !== undefined){

                  Swal.fire({
                    icon: 'info',
                    text:inferencia2[0]['Observacion'],
                  })
      
                
                }else{
      
                  setInferencia_2(inferencia2)
      
                }
              }
            });

          }else{

            setInferencia_1(inferencia1)
            // miramos la otra alerta
            if (inferencia2[0]['Observacion'] !== undefined){

              Swal.fire({
                icon: 'info',
                text:inferencia2[0]['Observacion'],
              })
  
            
            }else{
  
              setInferencia_2(inferencia2)
  
            }
          
          }

          


        }
        
      }

    }

  }



  return (
    <div className='body_'>
      {
          preloader ?
          <Preloader type={'spokes'}/>
          :

          <></>
      }
      <Navigationbar></Navigationbar>
      
      <div className='carouselBody_ font' style={{backgroundImage: `url(${Imagen_3})`,backgroundSize:'cover','display':'flex','flexDirection':'column'}}>
         
          <p className='title width-title nova'  style={{color:'white'}}>Sistema de recomendación de productos</p>
          <div class="icon-scroll" style={{position:'relative'}}></div>
      </div>
      
      <div className='FormularioBody nova'>
        <p className='nova description_'>Registra el siguiente formulario para realizar la inferencia</p>
        <form className='formulario'>
          <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' value={data.Nit} onChange={(event)=>readInput(event,'Nit')}/>
                            <label style={{color:'#d2d5d8'}} className='fs-5- ff-monse-regular-'>Nit del cliente</label>
                          </div>
              </div>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" 
                            name='identification'
                            value={data.Departamento} onChange={(event)=>readInput(event,'Departamento')} />
                            <label style={{color:'#d2d5d8'}} className='fs-5- ff-monse-regular-'>Departamento</label>
                          </div>
              </div>
          </div>
          <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification'
                            value={data.Ciuu} onChange={(event)=>readInput(event,'Ciuu')} />
                            <label style={{color:'#d2d5d8'}} className='fs-5- ff-monse-regular-'>Ciuu del cliente</label>
                          </div>
              </div>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' 
                              value={data.client_section} onChange={(event)=>readInput(event,'client_section')}
                            />
                            <label style={{color:'#d2d5d8'}} className='fs-5- ff-monse-regular-'>Sección económica del cliente</label>
                          </div>
              </div>
          </div>
          <div className='row gx-2 d-flex flex-row justify-content-end align-items-start align-self-start mt-5'>
                <div className='col-auto'>
                    <button 
                    onClick={AppendProduct} className='buttonProduct btn btn-dark-purple- rounded-pill ps-5 pe-5 d-flex flex-row justify-content-center align-items-center align-self-center h-45-' type="button" >
                      <span className='lh-1 fs-6- ff-monse-regular- fw-semibold'>+ Producto</span>
                    </button>
                </div>
          </div>
          {data?.products?.length !== 0 ? 
          
            <div className='table-responsive table-general-' style={{marginTop:'30px'}}>
                <table className='table table-sm table-striped table-no-border- align-middle'>
                  <thead>
                    <tr>
                      <th scope="col" className='th-width-md-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Acciones</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Código</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.products.map((obj,index)=>{

                      return(
                      <tr key={index}>
                      <td 
                      className='align-middle'>
                        <p onClick={()=>deleteProduct(index)} className='delete m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' style={{cursor:'pointer'}}>X</p>
                      </td>
                      <td className='align-middle'>
                        <div id='internal-form' className='w-100'>
                          <input value={data?.products[index].code}
                          onChange={(event)=>ReadInputTable(event,index)} type="text" className='form-control p-0 text-center input-large-' placeholder='Campo editable'/>
                        </div>
                      </td>
                    </tr>
                      )

                    })}
                    
                  </tbody>
                </table>
          </div>
          :
          <></>
          } 

          <div className='row gx-2 d-flex flex-row justify-content-end align-items-start align-self-start mt-5'>
                <div className='col-auto'>
                    <button  
                    onClick={doInference} className='buttonProduct btn btn-dark-purple- rounded-pill ps-5 pe-5 d-flex flex-row justify-content-center align-items-center align-self-center h-45-' type="button" >
                      <span className='lh-1 fs-6- ff-monse-regular- fw-semibold'>Inferencia</span>
                    </button>
                </div>
          </div>
          
          {inferencia_1 !== null ? 
          <>

          
          <p className='font description_' style={{marginTop:'20px'}}>Recomendación de Productos Complementarios</p>
          <div className='table-responsive table-general-' style={{marginTop:'30px'}}>
                <table className='table table-sm table-striped table-no-border- align-middle'>
                  <thead>
                    <tr>
                      <th scope="col" className='th-width-md-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Código</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Nombre</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {
                        inferencia_1.map((obj,index)=>{
                          return (
                            <tr key={index}>
                            <td className='align-middle'>
                              <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >{obj['codigo']}</p>
                            </td>
                            <td className='align-middle'>
                              <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >{obj['nombre articulo']}</p>
                            </td>
                          </tr>

                          )
                          
                        })
                    }
                    

                  </tbody>
                </table>
          </div>
          </>
          
            
          :
          <></>
          
          
          
          }

          {inferencia_2 !== null  ? 
          <>
          <p className='font description_' style={{marginTop:'20px'}}>Recomendación de prepedido</p>
          <div className='table-responsive table-general-' style={{marginTop:'30px'}}>
                <table className='table table-sm table-striped table-no-border- align-middle'>
                  <thead>
                    <tr>
                      <th scope="col" className='th-width-md-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Código</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Nombre</span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    
                    
                    {inferencia_2.map((obj,index)=>{
                      return(
                      <tr key={index}>
                          <td className='align-middle'>
                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{obj['Codigo Prepedido']}</p>
                          </td>
                          <td className='align-middle'>
                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{obj['nombre articulo Prepedido']}</p>
                          </td>
                      </tr>
                      )
                    })}
                    

                  </tbody>
                </table>
          </div>
          <div className='row gx-2 d-flex flex-row justify-content-end align-items-start align-self-start mt-5'>
                {/* <div className='col-auto'>
                    <button  className='buttonProduct btn btn-dark-purple- rounded-pill ps-5 pe-5 d-flex flex-row justify-content-center align-items-center align-self-center h-45-' type="button" >
                      <span className='lh-1 fs-6- ff-monse-regular- fw-semibold'>Descargar</span>
                    </button>
                </div> */}
          </div>

          </>
          :
          <></>
          }
          
        </form>
      </div>
    </div>
  )
}
