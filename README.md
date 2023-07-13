# Android Connect App

Este projeto Node.js permite a conexão com dispositivos Android através do Android Debug Bridge (ADB). Permite parear, conectar, desconectar, listar dispositivos conectados e conectar a tela de um dispositivo Android.

## Pré-requisitos

- Node.js instalado
- `winget` (Windows Package Manager) instalado para baixar o `scrcpy` automaticamente

## Instalação

Primeiro, clone este repositório em seu sistema local. Então, navegue para o diretório do projeto e instale as dependências necessárias com o npm:

```
git clone https://github.com/GabryelBatista/android-connect.git
cd android-connect
npm install
```

## Uso

Para iniciar o aplicativo, execute o comando a seguir no diretório do projeto:

```
node .
```

Após a inicialização, o aplicativo exibirá um menu de ações possíveis:

- **Pair**: Pareia o dispositivo. Será solicitado que você forneça o IP, a porta e o código do dispositivo.
- **Connect**: Conecta ao dispositivo. Será solicitado que você forneça o IP e a porta do dispositivo.
- **Disconnect**: Desconecta do dispositivo. Será solicitado que você forneça o IP e a porta do dispositivo.
- **List**: Lista todos os dispositivos conectados.
- **ScreenConnect**: Conecta a tela do dispositivo.

## Contribuição

Pull requests são bem-vindos. Para mudanças importantes, por favor abra uma issue primeiro para discutir o que você gostaria de mudar.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)