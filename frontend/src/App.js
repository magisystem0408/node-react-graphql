import './App.css';
import {Header} from "./components/Header";
import {Col, Container, Row} from "reactstrap";
import {SideNav} from "./components/SideNav";
import {MovieList} from "./components/MovieList";
import {ApolloClient} from "apollo-boost";
import {ApolloProvider, useQuery} from "@apollo/react-hooks";
import {MOVIE_LIST} from "./querires/querires";


const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

const App = () => {
    const {loading ,error,data} =useQuery(MOVIE_LIST)
    return (
        <div className="App">
            <Header/>
            {/*apollo clientの適応*/}
            <ApolloProvider client={client}>
                <Container>
                    <Row>
                        <Col xs={12} sm={4}>
                            <SideNav/>
                        </Col>
                        <Col xs={12} sm={8}>
                            <MovieList/>
                        </Col>
                    </Row>
                </Container>
            </ApolloProvider>
        </div>
    );
}

export default App;
