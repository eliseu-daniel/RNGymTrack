# 📱 GymTrackPro Mobile - React Native (Expo)

Aplicativo mobile do **GymTrackPro**, desenvolvido com **React Native
utilizando Expo**, destinado a pacientes acessarem seus treinos, dietas
e acompanharem seu progresso.

------------------------------------------------------------------------

## 🚀 Tecnologias utilizadas

-   React Native
-   Expo
-   Expo Router
-   Axios / Fetch API
-   TypeScript
-   Context API

------------------------------------------------------------------------

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado:

-   Node.js
-   npm ou yarn
-   Expo CLI (opcional, recomendado)

Instalar globalmente:

``` bash
npm install -g expo-cli
```

------------------------------------------------------------------------

## 📦 Instalação do projeto

Clone o projeto e instale as dependências:

``` bash
npm install
```

------------------------------------------------------------------------

## 🌐 Configuração IMPORTANTE (IP da API)

Para o aplicativo funcionar corretamente, é necessário alterar o IP da
API para o IP atual da sua rede local.

Arquivo:

    service/httpService.ts

Procure por algo como:

``` ts
const baseURL = "http://192.168.0.10:8000/api";
```

E altere para o IP atual do seu computador.

------------------------------------------------------------------------

### 📍 Como descobrir seu IP

Linux:

``` bash
ip a
```

Windows:

``` bash
ipconfig
```

Mac:

``` bash
ifconfig
```

⚠️ **IMPORTANTE**

O celular e o computador devem estar na mesma rede Wi-Fi.

------------------------------------------------------------------------

## ▶️ Executando o projeto

Inicie o Expo:

``` bash
npx expo start
```

Depois:

-   pressione **a** → Android Emulator
-   pressione **i** → iOS Simulator
-   ou escaneie o QR Code com o app **Expo Go**

------------------------------------------------------------------------

## 👤 Usuário padrão para teste

    email: talita@gmail.com

------------------------------------------------------------------------

## 📁 Estrutura do projeto

    src/
     ├── app/
     ├── components/
     ├── services/
     │    └── httpService.ts
     ├── contexts/
     ├── hooks/
     └── assets/

------------------------------------------------------------------------

## 🛠 Backend

Certifique-se que o backend está rodando:

``` bash
php artisan serve --host=0.0.0.0 --port=8000
```

------------------------------------------------------------------------

## 👨‍💻 Desenvolvido por

Eliseu Ferreira\
Projeto GymTrackPro

------------------------------------------------------------------------

## 📄 Licença

Projeto privado.