import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, AddIcon, ViewIcon } from "@chakra-ui/icons";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    NumberInput,
    NumberInputField,
    Switch,
    Select,
    Image,
    VStack,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useDisclosure,
  } from "@chakra-ui/react";
  import axios from "axios";
const Sales = ({ session, showNotification, changeRightComponent }) => {
    const [sales, setSales] = useState([]);
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/pedidos/all/${
              session?.bussines || session?.user?.bussines
            }`
          ); // Reemplaza con tu endpoint
          console.log(response.data.data);
          
          setSales(response.data.data);
          showNotification("success", "Ventas cargadas correctamente");
        } catch (error) {
          console.error("Error al obtener las Ventas:", error);
          showNotification("Error al cargar las Ventas", "error");
        }
    };
    useEffect(() => {
        fetchData();
      }, []);
  return (
    <>
        <div className="projects-section">
            <div className="projects-section-header">
                <p>Ventas</p>
            </div>
            <div className="project-boxes">
                <Table variant="striped" bg="#4fc8dc">
                    <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Estado</Th>
                        <Th>Venta</Th>
                        <Th>%</Th>
                        <Th>Fecha</Th>
                        <Th>Acciones</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {sales.map((sale) => (
                            <Tr key={sale.id_pedido}>
                                <Td>{sale.id_pedido}</Td>
                                <Td>{sale.nameStatus}</Td>
                                <Td>{sale.total}</Td>
                                <Td >{(sale.total*0.15)}</Td>
                                <Td>{sale.fecha_pedido}</Td>
                                <Td>
                                    <HStack spacing={2}>
                                        <IconButton
                                            aria-label="Ver"
                                            icon={<ViewIcon />}
                                            onClick={(e) => {
                                                changeRightComponent("detail", sale.id_pedido);
                                              }}
                                        />
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
        </div>
    </>
  )
}
export default Sales;