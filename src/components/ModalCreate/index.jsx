import { useState, useContext } from 'react';
import { Form } from '@unform/web';
import {
    Modal, 
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormGroup,
    Label
} from 'reactstrap';

import api from '../../services/api';

import Input from '../Input';

import { ToolsContext } from '../../context/ToolsContext';

const ModalCreate = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const { tools, setTools } = useContext(ToolsContext)

    const handleSubmit = async formData => {
        formData.tags = formData.tags.split(' ')
        const {data} = await api.post(`/`, formData)
        setTools([...tools, data])
        toggle()
    }
     
    return (
        <>
            <Button onClick={toggle}>+ Add</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <Form onSubmit={handleSubmit}>
                    <ModalHeader toggle={toggle}>
                        Add new tool
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="title">Tool Name</Label>
                            <Input type="text" name="title" id="title"/>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="link">Tool link</label>
                            <Input type="text" name="link" id="link"/>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="description">Tool description</label>
                            <Input type="text" name="description" id="description"/>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="tags">Tool tags</label>
                            <Input type="text" name="tags" id="tags"/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" >
                            Add tool
                        </Button>{' '}
                    </ModalFooter>
                </Form>
            </Modal>
      </>
    )
}

export default ModalCreate;