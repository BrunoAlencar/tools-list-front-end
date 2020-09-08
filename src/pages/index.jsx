import Head from 'next/head';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { Label } from './styles'

import { ToolsContext } from '../context/ToolsContext';

import {
  Input,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';

import api from '../services/api';
import Card from '../components/Card';
import ModalCreate from '../components/ModalCreate';


export async function getServerSideProps({query}) {
  const { data } = await api.get('', {
    params: query
  })

  return {
    props: {
      initialTools: data,
      q:  query?.q || query?.tags_like || '',
      isTagsOnly: !!query?.tags_like
    },
  }
}


const Home = ({q, initialTools, isTagsOnly}) => {
  const router = useRouter()
  const [tools, setTools] = useState([...initialTools])
  const [search, setSearch] = useState(q || '')
  const [typingTimeout, setTypingTimeout] = useState(0)
  const [isOnlyTagsSearch, setIsOnlyTagsSearch] = useState(isTagsOnly || false)
  
  useEffect( () => {
    (async () => {
    })(); 
  },[])

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    
    setTypingTimeout(setTimeout(async () => {
      runSearch(isOnlyTagsSearch)
    }, 500))
  }, [search])

  const runSearch = async (searchByTag = false) => {
    const searchParam = searchByTag ? 
    `?tags_like=${search}` : `?q=${search}`
    const { data } = await api.get(searchParam)
    setTools([...data])
    router.push(`/${searchParam}`, undefined, { shallow: true })
  }

  const toggle =  () => {
    setIsOnlyTagsSearch(!isOnlyTagsSearch)
    runSearch(!isOnlyTagsSearch)
  }

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToolsContext.Provider value={{tools, setTools}}>
      <Row>
        <Col>
          <h1>VUTTR</h1>
          <h2>Very Useful Tools to Remember</h2>
        </Col>
      </Row>
      <Row>
        <Col >
          <InputGroup >
            <InputGroupAddon addonType="prepend">🔍</InputGroupAddon>
            <Input
            type="text"
            placeholder="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
         

        </Col>
        <Col >
            <Label check>
              <Input type="checkbox" checked={isOnlyTagsSearch} onChange={toggle} />{' '}
              Search in tags only
            </Label>
        </Col>
        <ModalCreate className="float-right"/>
        
      </Row>
        
        <div>
          { tools ? tools.map((item) => (
                      <Card key={item.id} props={item}/>
                  )): null }
        </div>
      
      </ToolsContext.Provider>
          
        
    </Container>
  )
}

export default Home;

