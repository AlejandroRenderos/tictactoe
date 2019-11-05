import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let app = {
    init :  function () {
        esta . addEvents ();
    },
    addEvents :  function () {
        let  loadContent  =  function () {
            buscar ( " / materia " )
                . entonces ( res  =>  res . json ())
                . entonces ( datos  => {
                    let materias =  document . getElementsByClassName ( " materias " ) [ 0 ];

                    materias . innerHTML  =  datos . reducir (( cadena , elemento ) => {
                        volver cadena +
                            ` <tr>
                                <td class = "name"> $ { elemento . nombre } </td>
                                <td class = "uv"> $ { elemento . uv } </td>
                                <td class = "options"> 
                                    <a data-id=" ${ elemento. _id} "class="more" href=""> Más </a>
                                    <a data-id=" ${ elemento. _id} "class="edit" href=""> Editar </a>
                                    <a data-id=" ${ elemento. _id} "href=""> class="delete" Eliminar </a>
                                </td>
                            </tr> `
                    }, " " );

                    documento . querySelectorAll ( " .delete " ). forEach ( element  => {
                        elemento . addEventListener ( ' clic ' , función ( evento ) {
                            evento . preventDefault ();
                            let id =  elemento . getAttribute ( " id-datos " );
                            fetch ( ' / materia / '  + id, {
                                    método :  ' BORRAR '
                                })
                                . entonces ( res  =>  res . json ())
                                . entonces ( datos  => {
                                    if ( datos . éxito ) {
                                        materias . removeChild ( element . parentElement . parentElement );
                                    }
                                }). atrapar ( err  => {
                                    consola . log (err);
                                });
                        });
                    });
                    documento . querySelectorAll ( " .more " ). forEach ( element  => {
                        elemento . addEventListener ( ' click ' , function ( evnt ) {
                            evnt . preventDefault ();
                            let name =  this . parentElement  // td
                                . parentElement  // tr
                                . getElementsByClassName ( " nombre " ) [ 0 ]
                                . innerText ;
                            buscar ( ' / materia / '  + nombre)
                                . entonces ( res  =>  res . json ())
                                . entonces ( función ( datos ) {
                                    consola . registro (datos);
                                });
                        });
                    });
                    documento . querySelectorAll ( " .edit " ). forEach ( element  => {
                        elemento . addEventListener ( ' click ' , function ( evnt ) {
                            evento . preventDefault ();
                            let id =  elemento . getAttribute ( " id-datos " );
                            buscar ( ' / materia / '  + id)
                                . entonces ( res  =>  res . json ())
                                . entonces ( datos  => {
                                    let form =  document . formas . saveMateria ;

                                    formulario . nombre . valor  =  datos . nombre ;
                                    formulario . uv . valor  =  datos . UV ;
                                    formulario . descripcion . valor  =  datos . descripcion ;
                                    formulario . acción  =  " / materia / "  +  datos . _id ;
                                });
                        });

                    });

                });
        }
        let form =  document . formas . saveMateria ;

        formulario . addEventListener ( ' submit ' , function ( event ) {
            evento . preventDefault ();
            if ( form . action  ==  ' / materia ' ) {
                buscar ( formulario . acción , {
                        método :  ' POST ' ,
                        cuerpo :  nuevo  URLSearchParams ( nuevo  FormData (formulario))
                    }). entonces ( res  =>  res . json ())
                    . entonces ( datos  => {
                        consola . registro (datos);
                        loadContent ();
                    });
            } más   {
                buscar ( formulario . acción , {
                        método :  ' PUT ' ,
                        cuerpo :  nuevo  URLSearchParams ( nuevo  FormData (formulario))
                    }). entonces ( res  =>  res . json ())
                    . entonces ( datos  => {
                        if ( datos . éxito ) {
                            formulario . acción =  ' / materia ' ;
                            formulario . método  =  ' POST ' ;
                            alerta ( ' Los dataos fuero actu ... ' );
                            formulario . uv . valor  =  forma . nombre . valor  =
                            formulario . descripcion . valor  =  " " ;
                            loadContent ();
                        }
                    });
            }
        });

        loadContent ();
    }
};
ventana . onload  = () =>  aplicación . init ();