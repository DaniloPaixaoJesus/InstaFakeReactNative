/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Post from './Post';
import InstaluraFetchService from '../services/InstaluraFetchService';
import Notificacao from '../api/Notificacao';
import HeaderUsuario from './HeaderUsuario';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const width = Dimensions.get('screen').width;

//https://instalura-api.herokuapp.com/api/public/fotos/${this.loginPesquisado.value}
const fotosTeste = [
  {id: 1, usuario: 'Danilo'},
  {id: 2, usuario: 'Daniel'},
  {id: 3, usuario: 'Adriel'}
];

/**
 * App Class
 * componente maior que isola e encapsula as regras do seu negócio chamamos de container components.
 */
type Props = {};
export default class Feed extends Component<Props> {

  static navigatorButtons = {
    leftButtons: [// buttons for the left side of the nav bar (optional)
      {
        icon: require('../../resources/img/icon1.png'),
        title: 'menu', // for a textual button, provide the button title (label)
        id: 'menu', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: 'e2e_rules' // optional, used to locate this view in end-to-end tests
      },
    ]
  };
  
  //construtor da classe App
  constructor(props) {
    super(props);
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      fotos: [],
      drawerShow: false
    }
  }

  navToScreen(screen, title){
    this.props.navigator.push({
      screen: screen,
      title: title,
    });
  }

  closeDrawerMenu(){
    this.setState({drawerShow: false});
    this.props.navigator.toggleDrawer({
      side: 'left',
      visible: true,
      to: 'closed'
    });
  }

  openDrawerMenu(){
    this.setState({drawerShow: true});
    this.props.navigator.toggleDrawer({
      side: 'left',
      visible: true,
      to: 'open'
    });
  }

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(event => {
      //treat menu item links
      if (event.type == 'DeepLink') {
        const parts = event.link;
        this.closeDrawerMenu();
        this.navToScreen(parts, '');
      }

      //treat menu button touch
      if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
        if (event.id == 'menu') {
          if(this.state.drawerShow){
            this.closeDrawerMenu();
          }else{
            this.openDrawerMenu();
          }
        }
      }
      //load photos
      if(event.id === 'willAppear'){
        this.load();
      }

    });
  }

  load() {
    const uri = 'fotos';
    if(this.props.loginUsuario){
      uri = `fotos/${this.props.loginUsuario}`;
    }
    InstaluraFetchService
        .get(uri)
        .then(json => this.setState({fotos: json, status: 'NORMAL'}))
        .catch(e => this.setState({status: 'FALHA_CARREGAMENTO'}));
  }

  adicionaComentario(idFoto, comentario, inputComentario) {
    if(comentario === '')
        return;   
    const listaOriginalFotos = this.state.fotos;
    const foto = this.buscaPorId(idFoto);
    const dados = { texto : comentario };
    InstaluraFetchService
      .post(`fotos/${idFoto}/comment`, dados)
      .then(comentario => {
        //concatena duas listas -> ES6
        const novaListaComentarios = [ ...foto.comentarios, comentario ];
        const fotoAtualizada = {
          ...foto,
          comentarios: novaListaComentarios
        }
        this.atualizaFoto(fotoAtualizada);
        inputComentario.clear();
      })
      .catch(e => {
        //console.warn(e);
        this.setState({fotos:listaOriginalFotos});
        Notificacao.exibe('Ops..', 'Algo deu errado ao adicionar o comentário');
      });
  }

  like(idFoto){
    const listaOriginalFotos = this.state.fotos;
    const foto = this.state.fotos.find(foto => foto.id === idFoto);
    AsyncStorage.getItem('usuario').then(usuarioLogado => {
        let novaLista = [];
        if(!foto.likeada){
            novaLista = foto.likers.concat({login: usuarioLogado});
        } else{
            novaLista = foto.likers.filter(liker => {
              return liker.login !== usuarioLogado;
            })
        }
        return novaLista;
      }).then(novaLista => {
        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
          }
        this.atualizaFoto(fotoAtualizada);
    });

    InstaluraFetchService
          .post(`fotos/${idFoto}/like`)
          .catch(e => {
            //console.warn(e);
            this.setState({fotos:listaOriginalFotos});
            Notificacao.exibe('Ops..', 'Algo deu errado');
          });
  }

  buscaPorId(idFoto){
    return this.state.fotos.find(foto => foto.id === idFoto);
  }

  atualizaFoto(fotoAtualizada){
    const fotos = this.state.fotos
                    .map(
                      foto => foto.id === fotoAtualizada.id ? fotoAtualizada: foto
                    );
    this.setState({fotos});
    //this.setState({fotos:fotos}); mesmo que
                
  }

  verPerfilUsuario(idFoto){
    const foto = this.buscaPorId(idFoto);
    this.props.navigator.push({
      screen: 'PerfilUsuario',
      backButtonTitle: '',
      title: foto.loginUsuario,
      passProps: {
        usuario : foto.loginUsuario,
        fotoDePerfil: foto.urlPerfil
      }
    });
  }

  exibeHeader() {
    if(this.props.usuario)
      return <HeaderUsuario {...this.props} posts={this.state.fotos.length} />;
  }

  render() {
    if(this.state.status === 'FALHA_CARREGAMENTO')
      return (
        <TouchableOpacity style={styles.container} onPress={this.load.bind(this)}>
          <Text style={[styles.texto, styles.titulo]}>Ops..</Text>
          <Text style={styles.texto}>Não foi possível carregar o feed</Text>
          <Text style={styles.texto}>Toque para tentar novamente</Text>
        </TouchableOpacity>
      );
    return (
      <ScrollView>
        {this.exibeHeader()}
        <FlatList 
          data={this.state.fotos}
          keyExtractor={item => item.id}
          renderItem={ ({item}) => 
            <Post foto={item}
                likeCallback={this.like.bind(this)}
                addComentarioCallback={this.adicionaComentario.bind(this)}
                verPerfilCallback={this.verPerfilUsuario.bind(this)}
            />
          }
        />
      </ScrollView>
    );
  }
}

//const margem = Platform.OS == 'ios' ? 20 : 0; //nao eh mais necessario apos o uso do react-native-navegator
const styles = StyleSheet.create({
  // containerFlatList: {
  //   marginTop: margem
  // },
  cabecalho: {
    margin: 10, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10, 
    borderRadius: 20, 
    width:40, height:40
  },
  foto: {
    width:width, 
    height:width
  }
})
