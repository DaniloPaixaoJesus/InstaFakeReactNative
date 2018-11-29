import {
    AlertIOS,
    ToastAndroid
} from 'react-native';

export default class Notificacao {

    static exibe(titulo, mensagem){
        AlertIOS.alert(titulo, mensagem);
        //ToastAndroid.show(mensagem, ToastAndroid.SHORT);
    }
}