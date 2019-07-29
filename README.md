#######CCONET APP GUARDA#########
Projeto construido utilizando a tecnologia react native versão 0.49.0, mais em: https://facebook.github.io/react-native/docs/0.49/getting-started.html
Instalação
-> git clone https://bitbucket.org/cpninformatica/mobguarda
-> cd <DIR>/mobguarda
-> via linha de comando executar npm install aguarde a instalação das dependencias

Compilação
-> cd <DIR>/mobguarda
-> para executar em ambiente android react-native run-android
-> para executar em ambiente ios react-native run-ios

Gerando Assinatura da APK Android
-> cd <DIR>/Java/jdkx.x.x_x/bin
-> excute o comando: keytool -genkey -v -keystore mobguarda.keystore -alias mobguarda -keyalg RSA -keysize 2048 -validity 10000
-> Após isso o .keystore estará disponivel no mesmo diretorio aonde foi executado o comando
-> copie o arquivo mobguarda.keystore e cole em <DIR>/mobguarda/android/app
-> edite o arquivo <DIR>/mobguarda/android/.gradle/gradle.properties, inclua as seguintes linhas:
    MYAPP_RELEASE_STORE_FILE=mobguarda.keystore
    MYAPP_RELEASE_KEY_ALIAS=mobguarda
    MYAPP_RELEASE_STORE_PASSWORD=cpn#2010
    MYAPP_RELEASE_KEY_PASSWORD=cpn#2010
-> edite o arquivo <DIR>/mobguarda/android/app/build.gradle, inclua as seguintes configurações:
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
-> no arquivo <DIR>/mobguarda/android/app/build.gradle procure o atributo buildTypes, e dentro do atributo release
insira a seguinte configuração:
    signingConfig signingConfigs.release     

Gerando APK Android
-> cd <DIR>/mobguarda/android
-> gradlew assembleRelease
-> Depois disto a .apk estará dispónivel em <DIR>/mobguarda/android/app/build/outputs/apk/app-release.apk

Executando o projeto em versão RELEASE
-> Execute react-native run-android --variant=release
