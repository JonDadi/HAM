import React, { Component } from 'react';
import NavBarMenu from './Navbar/navBarMenu';
import { browserHistory } from 'react-router';
import './App.css';
class App extends Component {

  render() {
    return (
      <div className="fontPage">
        <NavBarMenu />
        <div className="frontPageWrapper">
          <h1>Hugræn Atferlismeðferð</h1>
          <p>Þessi síða var unnin sem sex eininga lokaverkefni í tölvunarfræði við Háskóla Íslands.</p>
          <p>Á henni er hægt að fylla út verkefnablöð í tengslum við hugræna atferlismeðferð. </p>
          <p>Höfundur síðunnar er <strong>Jón Daði Jónsson</strong>, leiðbeinandi var <strong>Ólafur Sverrir Kjartansson</strong>. </p>
          <p>Framendi síðunnar er forritaður í <strong>React.</strong></p>
          <p>Bakendinn keyrir á <strong>Node</strong> server með <strong>Express</strong> frameworkinu og <strong>Postgres</strong> gagnagrunn</p>
        </div>
      </div>
    );
  }
}

export default App;
