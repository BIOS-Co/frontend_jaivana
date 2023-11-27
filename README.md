# Frontend Sistema de Recomendación de Productos y Sistema Automático de Fijación de Precios:


# Prerrequisitos para la Instalación:

Para instalar y ejecutar la solución, se deben cumplir los siguientes prerrequisitos:

- **Node js:** Es necesario tener instalado Node js versión 21.2.0 o superior.
- **npm:** Es necesario tener instalado npm versión 10.2.3 o superior.
- **git:** Es necesario tener instalado git.

# Instrucciones de Instalación:

Para instalar el software, abra su interfaz de línea de comandos preferida y siga los pasos detallados a continuación:

Clone el repositorio en la máquina en la cual vaya a hacer el despliegue

```
$ git clone https://github.com/BIOS-Co/Backend_Jaivana.git
```

Acceda al directorio del proyecto con el siguiente comando:

```
$ cd Backend_Jaivana
```

Cree un entorno virtual:

```
$ python3 -m venv venv
```

Active el entorno virtual:

```
$ source venv/bin/activate
```

Instale los requerimientos:

```
$ pip install -r requirements.txt
```

Lance el servicio:

```
$ uvicorn main:app --reload --port 8080
```

