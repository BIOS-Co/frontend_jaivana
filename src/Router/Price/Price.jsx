import React from 'react'
import './Price.css'
import Navigationbar from '../../Components/Navbar/Navbar'
import Imagen_3 from '../../img/Fondo_2.jpg';
import Swal from 'sweetalert2';
import Preloader from '../../Components/Loading/Loading';
/* FORM */

import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';

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
    backgroundColor: 'white',
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
    backgroundColor: state.isSelected ? "var(--color-purple-)" : "white",
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

export default function Price() {

  /* USE STATES */
  
  let [data,setData] = React.useState({
    'calculate':"",
    'iterate':"",
    'pareto':"",
  })

  let [data_1,setData_1] = React.useState({
    'code':'',
    'descuento':'',
    'nit':'',
    'umbral':''
  })

  let [data_2,setData_2] = React.useState({
    'code_group':'',
    'code_Subgroup':'',
    'descuento':'',
    'nit':'',
    'umbral':''
  })

  
  /* input */

  const readInput_1=(event,type)=>{

    setData_1({...data_1,[type]:event.target.value})

  }

  const readInput_2=(event,type)=>{

    setData_2({...data_2,[type]:event.target.value})

  }

  const readSelect=(event,type)=>{

    if(event){

      setData({...data,[type]:event.value})

    }else{

      setData({...data,[type]:""})

    }

    

  }

  let [preloader,setPreloader] = React.useState(false);
  let [inferencia,setInferencia] =React.useState(null);

  const doInference=async()=>{

    if(data.calculate === 'Precio de un producto'){

       if(data_1.code === "" || data_1.nit === "" || data_1.umbral === ""){

        Swal.fire({
          icon: 'info',
          text:"Los campos de código , nit y umbral son obligatorios.",
         })

       }else{

        setInferencia({'data':'nice'})
        setPreloader(true);
        setTimeout(()=>{
            setPreloader(false);
        },1800)

       }

    }else{

      if(data_2.code_group === "" || data_2.code_Subgroup === "" || data_2.umbral === "" || data_2.nit === ""){

        Swal.fire({
          icon: 'info',
          text:"Solo el campo de descuento no es obligatorio.",
         })

       }else{

        setInferencia({'data':'nice'})
        setPreloader(true);
        setTimeout(()=>{
            setPreloader(false);
        },1800)

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
      <div className='carouselBody_ font' style={{backgroundImage: `url(${Imagen_3})`,backgroundSize:'cover'}}>
          <p className='font title ' id='dropdown-basic' style={{color:'white'}}>Precios</p>
      </div>
      <div className='FormularioBody font'>
        <p className='font description_'>Registra el siguiente formulario para realizar la inferencia</p>
        <form className='formulario'>
          <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                    <div className='form-floating inner-addon- left-addon-'>
                      <Select options={[{value:"Precio de un producto",label:"Precio de un producto"},{value:"Precios de todos los productos",label:"Precios de todos los productos"}]} value={{value:data?.calculate,label:data?.calculate}} onChange={(event)=>readSelect(event,'calculate')} components={{ ValueContainer: CustomValueContainer, animatedComponents, NoOptionsMessage: customNoOptionsMessage, LoadingMessage: customLoadingMessage }} placeholder="¿Qué desea Calcular?" styles={selectStyles} isClearable={true} name='typeIdentification'/>
                    </div>
              </div>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                    <div className='form-floating inner-addon- left-addon-'>
                    <Select options={[{value:"Iterar por Historial Proveedor ",label:"Iterar por Historial Proveedor "},{value:"Iterar por Historial Producto/Familia",label:"Iterar por Historial Producto/Familia"}]} value={{value:data?.iterate,label:data?.iterate}} onChange={(event)=>readSelect(event,'iterate')} components={{ ValueContainer: CustomValueContainer, animatedComponents, NoOptionsMessage: customNoOptionsMessage, LoadingMessage: customLoadingMessage }} placeholder="¿Cómo Desea Iterar?" styles={selectStyles} isClearable={true} name='typeIdentification'/>
                    </div>
              </div>
          </div>
          <div style={{marginBottom:'100px'}} className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                    <div className='form-floating inner-addon- left-addon-'>
                      <Select options={[{value:"Pareto",label:"Pareto"},{value:"No pareto",label:"No pareto"}]} value={{value:data?.pareto,label:data?.pareto}} onChange={(event)=>readSelect(event,'pareto')} components={{ ValueContainer: CustomValueContainer, animatedComponents, NoOptionsMessage: customNoOptionsMessage, LoadingMessage: customLoadingMessage }} placeholder="¿Producto pareto?" styles={selectStyles} isClearable={true} name='typeIdentification'/>
                    </div>
              </div>
          </div>

          {data?.calculate !== "" && data?.iterate !== "" && data?.pareto !== "" ? 
          <>
          {data?.calculate==='Precio de un producto' ? 
          <>
          <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input value={data_1?.code} onChange={(event)=>readInput_1(event,'code')} type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' />
                            <label className='fs-5- ff-monse-regular-'>Codigo tornillo</label>
                          </div>
              </div>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input value={data_1?.umbral} onChange={(event)=>readInput_1(event,'umbral')} type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' />
                            <label className='fs-5- ff-monse-regular-'>Umbral Máximo de iteracciones por fecha</label>
                          </div>
              </div>
              
          </div>

          <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input value={data_1?.nit} onChange={(event)=>readInput_1(event,'nit')} type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' />
                            <label className='fs-5- ff-monse-regular-'>Nit proveedor</label>
                          </div>
              </div>
              
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input value={data_1?.descuento} onChange={(event)=>readInput_1(event,'descuento')}  type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' />
                            <label className='fs-5- ff-monse-regular-'>Descuento</label>
                          </div>
              </div>
          </div>
          </>
          :
          <>
          <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input value={data_2?.code_group} onChange={(event)=>readInput_2(event,'code_group')} type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' />
                            <label className='fs-5- ff-monse-regular-'>Código grupo</label>
                          </div>
              </div>
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input value={data_2?.code_Subgroup} onChange={(event)=>readInput_2(event,'code_Subgroup')} type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' />
                            <label className='fs-5- ff-monse-regular-'>Código subgrupo</label>
                          </div>
              </div>
          </div>

          <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input value={data_2?.umbral} onChange={(event)=>readInput_2(event,'umbral')}  type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' />
                            <label className='fs-5- ff-monse-regular-'>Umbral máximo de iteracciones por fecha</label>
                          </div>
              </div>
              
              <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input value={data_2?.nit} onChange={(event)=>readInput_2(event,'nit')} type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' />
                            <label className='fs-5- ff-monse-regular-'>Nit proveedor</label>
                          </div>
              </div>
          </div>
          <div className='row gx-0 gx-sm-0 gx-md-4 gx-lg-4 gx-xl-4 gx-xxl-5'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 mb-sm-3 mb-md-3 mb-lg-3 mb-xl-3 mb-xxl-3'>
                          <div className='form-floating inner-addon- left-addon-'>
                            <input value={data_2?.descuento} onChange={(event)=>readInput_2(event,'descuento')} type="text" className='form-control' id='identificationNumber' placeholder="Número de identificación" name='identification' />
                            <label className='fs-5- ff-monse-regular-'>Descuento</label>
                          </div>
              </div>
          </div>
          </>
          }
          


          
          
          <div className='row gx-2 d-flex flex-row justify-content-end align-items-start align-self-start mt-5'>
                <div className='col-auto'>
                    <button onClick={doInference}  className='buttonProduct btn btn-dark-purple- rounded-pill ps-5 pe-5 d-flex flex-row justify-content-center align-items-center align-self-center h-45-' type="button" >
                      <span className='lh-1 fs-6- ff-monse-regular- fw-semibold'>+ Inferencia</span>
                    </button>
                </div>
          </div>
          {inferencia !== null  ? 
          <>
          <p className='font description_' style={{marginTop:'20px'}}>Precio de un Producto</p>
          <div className='table-responsive table-general-' style={{marginTop:'30px'}}>
                <table className='table table-sm table-striped table-no-border- align-middle'>
                  <thead>
                    <tr>
                      <th scope="col" className='th-width-md-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Lista</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Precio de venta</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >49000</p>
                      </td>
                    </tr>
                    <tr>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >laurel</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >30000</p>
                      </td>
                    </tr>
                    <tr>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >49000</p>
                      </td>
                    </tr>
                    <tr>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >laurel</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >30000</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
          </div>
          <p className='font description_' style={{marginTop:'20px'}}>Precios de todos los productos</p>
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
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Código grupo</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Nombre grupo</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Código subgrupo</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Nombre subgrupo</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Peso</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Costo unitario</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Precio venta lista 1</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Precio venta lista 2</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Precio venta lista 3</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Precio venta lista 4</span>
                        </div>
                      </th>
                      <th scope="col" className='th-width-sm-'>
                        <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                          <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Precio venta lista 5</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                  <tr>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                    </tr>
                    <tr>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >Cemento</p>
                      </td>
                      <td className='align-middle'>
                        <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >203123</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
          </div>
          <div className='row gx-2 d-flex flex-row justify-content-end align-items-start align-self-start mt-5'>
                <div className='col-auto'>
                    <button  className='buttonProduct btn btn-dark-purple- rounded-pill ps-5 pe-5 d-flex flex-row justify-content-center align-items-center align-self-center h-45-' type="button" >
                      <span className='lh-1 fs-6- ff-monse-regular- fw-semibold'>Descargar</span>
                    </button>
                </div>
          </div>
          </>
          :
          <></>
          }
          
          </>
          :
          <></>
          }
          
        </form>
      </div>
    </div>
  )
}
