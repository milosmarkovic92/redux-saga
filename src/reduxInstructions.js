/*
    Store je najbitniji deo Reduxa, zato sto u njemu "skladistimo" kompletan state aplikacije. Taj state moze se koristiti u bilo kojoj komponenti unutar aplikacije.
    Store se dobija iz redux paketa, tacnije kroz "import createStore from 'redux';". createStore predstavlja funkciju koja ce imati jedan parametar, a taj parametar 
    predstavlja rootReducer, tacnije jos jednu funkciju koju smo importovali u Store. Reducer je vrlo bitan u Reduxu zbog toga sto njega koristimo za update state-a.
    Reducer se sastoji iz initialState-a, odnosno nekog defaultnog state-a, koji cemo updatovati kasnije; i od funkcije kroz koju cemo da vrsimo update. Ta funkcija
    je klasicna funkcija sa dva parametra. Prvi parametar je state = initialState i njega pisemo tako zato sto zelimo da to bude defaultno. Drugi parametar je
    action, odnosno akcija koja zahteva promene state-a.

        const initialState = {
            name: []
        }

        function rootReducer(state = initialState, action) {
            return state;
        }

        export default rootReducer;

    Redux actions predstavljaju obicne JavaScript objekte i oni se sastoje iz type-a i payload-a. U type-u opisujemo kako ce se state promeniti, dok u payload-u navodimo
    tu promenu.

        function addArticle(payload) {
            return {
                type: "ADD_ARTICLE",
                payload: {
                    id: 1,
                    title: "New Article Title"
                }
            }
        }
    
    Posto type predstavlja string, Reducer koristi taj string da ustanovi proracun novog state-a. Taj string mozemo izmestiti u neku eksternu konstantu i kasnije ga koristiti
    po potrebi. export const ADD_ARTICLE = "ADD_ARTICLE"; i zatim ga importujemo u action i zamenimo u type-u.
    Sada ce rootReducer izgledati ovako:

        import {ADD_ARTICLE} from '../const/actions';

        const initialState = {
            name: []
        }

        function rootReducer(state = initialState, action) {
            switch(action.type){
                case ADD_ARTICLE:
                    return {
                        ...state,
                        name: action.payload
                    }
            }
        }

        export default rootReducer;

    Ovde smo importovali konstantu iz actions fajla i u funkciji rootReducer pozvali switch metodu po action.type-u. Kada je odredjena akcija triggerovala reducer, izvrsice
    se odredjena akcija za taj type, odnosno izvrsice se update state-a.

    Tri najosnovnije metode u Redux-u su getState, dispatch i subscribe. Sa getState() dobavljamo trenutni state iz Reduxa. Dispatch obavestava store da zelimo da promenimo
    state i trigeruje callback funkciju kada se izvrsava akcija, dok Subscribe osluskuje promene state-a. 

    Najbitnija metoda za povezivanje React-a sa Reduxom je "connect". Ova metoda se primenjuje za dve stvari: da promeni state pomocu mapStateToProps metode i da pozove akciju
    pomocu mapDispatchToProps metode.

    Da bismo celu aplikaciju povezali sa Reduxom, potrebno je da importujemo Provider komponentu iz react-redux biblioteke, a zatim da wrappujemo citavu App komponentu, ovako:

        import {Provider} from 'react-redux';
        import store from '../js/store/store';

        <Provider store={store}>
            <App />
        </Provider>
        
    i prosledjujemo store kao props.

    mapStateToProps - upravlja state-om.
    dispatchStateToProps - upravlja metodama koje menjaju state.


    ***** Redux Middleware *****

    Redux middleware nam sluzi da izmestimo celu logiku iz React-a u Redux. On predstavlja funkciju koja za parametre moze imati getState i dispatch metode. Unutar middleware
    funkcije nalazi se nova funkcija koja za parametar ima next. Unutar next funkcije imamo novu funkciju koja za parametar ima action, i na kraju unutar ove funkcije pisemo
    logiku i u return-u vracamo next(action).

    Ukoliko koristimo API i zelimo da fetchujemo, koristicemo redux-thunk. Redux-thunk sluzi za asinhrono izvrsavanje. Importujemo thunk u store.js i dodeljujemo ga kao drugi
    parametar u applyMiddleware metodi. Nakon toga, u action.js kreiramo metodu, npr getData(), u kojoj cemo obaviti fetch. Unutar getData metode kreiramo novu metodu koja ce
    imati jedan parametar - dispatch, i u bodiju te metode cemo odraditi fetch. Umesto returna pozivamo dispatch:

        export function getData() {
            return function(dispatch) {
                fetch("API-GOES-HERE")
                    .then(response => response.json())
                    .then(json => {
                        dispatch({
                            type: YOUR_TYPE_NAME,
                            payload: json
                        })
                    })
            }
        }
    
    Takodje, u rootReducer dodajemo jos jedan case za data koji smo fetchovali i u state-u kreiramo jos jedan key koji punimo datom.


    ***** Redux Saga *****

    Redux-saga predstavlja Redux middleware koji sluzi za upravljanje side efektima. Sama sustina Redux-sage jeste da postoje odvojene sekcije za upravljanje akcijama API poziva
    i pristupanju state-u. Razlika izmedju redux-thunka i redux-sage je u tome sto u redux-thunk mozemo da upisujemo API poziv direktno u action, dok u redux-sagi mozemo da
    razdvajamo sinhronu od asinhrone logike i ta logika ce biti odvojena od Redux-a. Redux-saga ne koristi regularne JavaScript funkcije, vec generator funkcije. Generator
    funkcije su funkcije koje koriste asterisk(*) i yield metode - function*() { yield console.log('Hi);}. 
    
    Za razliku od react-thunka gde smo unutar action.js kreirali funkciju getData() koja poziva funkciju dispatch, u react-sagi koristimo istu funckiju ali bez poziva druge, vec
    samo vracamo type: 

        export function getData() {
            return {
                type: DATA_REQUESTED
            }
        }
    
    Zatim kreiramo novi fajl saga.js. Saga.js se sastoji iz dve generator funckije, watcher i worker. Watcher funkcija sluzi za "gledanje" svake akcije koja nam je potrebna i ona poziva
    worker funkciju, koja je zaduzena za API pozive. Takodje, potrebno je da importujemo nesto iz react-saga/effects biblioteke - takeEvery, call i put metode, i da importujemo
    konstantu koju smo koristili kao type u action.js. Takodje moramo da kreiramo i metodu koja ce odraditi fetch, sto je u ovom slucaju getData():

        import { takeEvery, call, put } from 'react-saga/effects';
        import { DATA_REQUESTED, DATA_LOADED, API_ERRORED } from 'constants';

        export default function* watcherSaga() {
            yield takeEvery(DATA_REQUESTED, workerSaga);
        }

        function* workerSaga() {
            try {
                const payload = yield call(getData); // ovde pozivamo metodu koja radi fetch
                yield put({             // ovo predstavlja action
                    type: DATA_LOADED,
                    payload
                })
            }
            catch (e) {
                yield put ({            // ovo predstavlja action koji hvata error
                    type: API_ERRORED,
                    payload: e
                })
            }
        }

        function getData() {
            return fetch('API-GOES-HERE')
                .then(response => response.json());
        }

    Kada smo sredili saga.js ostaje nam jos da to ubacimo u store.js. To se radi tako sto importujemo createSagaMiddleware iz redux-sage i apiSaga iz saga.js. 
    Nakon importa definisemo konstantu i njoj dodeljujemo funkciju createSagaMiddleware(), a zatim tu konstantu prosledjujemo kao drugi parametar u applyMiddleware
    metodi, umesto thunk-a i posle toga nad tom konstantom pozivamo metodu run, koja kao parametar ima apiSaga, odnosno celu watcher funkciju iz saga.js:

        import createSagaMiddleware from 'redux-saga';
        import apiSaga from 'saga.js';

        const initialiseSagaMiddleware = createSagaMiddleware();
        const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const store = createStore(
            rootReducer,
            storeEnhancers(
                applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware)
            )
        )

        initialiseSagaMiddleware.run(apiSaga);

        export default store;
*/