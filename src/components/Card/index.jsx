import { useState, useEffect, useContext } from "react";

import { Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from "reactstrap";

import { CardContainer } from "./styles";
import api from "../../services/api";
import { ToolsContext } from "../../context/ToolsContext";


const Card = ({ props: { id, title, link, description, tags } }) => {
  const [modal, setModal] = useState(false);
  const [tagsFormatted, setTagsFormatted] = useState('')
  const { tools, setTools } = useContext(ToolsContext)

  const toggle = () => setModal(!modal);

  const deleteTool = async () => {
    await api.delete(`/${id}`);
    toggle();
    setTools([...tools.filter(tool => tool.id != id)])
  };

  useEffect(() => {
    let tagsFormattedTemp = tags
    tagsFormattedTemp[0] = `#${tags[0]}`;
    setTagsFormatted(tags.join(" #"))
  },[])

  return (
    <>
      <CardContainer>
        <Row>

          <Col>
            <h3><a href={link}>{title}</a></h3>
          </Col>
          <Button color="link" onClick={toggle}>X Remover</Button>
        </Row>
          <p>{description}</p>
          <span>
            <b>{tagsFormatted ? tagsFormatted : null}</b>
          </span>
      </CardContainer>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Remove tool</ModalHeader>
        <ModalBody>
          Are you sure you want to remove <strong>{title}</strong> ?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="danger" onClick={deleteTool}>
            Yes, remove
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Card;
