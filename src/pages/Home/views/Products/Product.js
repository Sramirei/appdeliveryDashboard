import React, { useState, useEffect } from "react";
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
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import "./productStyle.css";
import "../../style.css";

const Product = ({ session, showNotification }) => {
  const [formData, setFormData] = useState({
    id_producto: 0,
    nombre: "",
    negocio_id: `${session?.bussines || session?.user?.bussines}`,
    descripcion: "",
    precio: 0,
    stock: 0,
    foto: "",
    disponible: false,
    categoria: "",
    ingredientes: [], // Aquí se agregarán los ingredientes seleccionados
    adiciones: [],
  });
  // Estado para las selecciones del usuario
  const [selectedIngredientes, setSelectedIngredientes] = useState([]);
  const [selectedAdiciones, setSelectedAdiciones] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [adiciones, setAdiciones] = useState([]);
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [newItem, setNewItem] = useState(""); // Para agregar nuevos ingredientes/adiciones

  const {
    isOpen: isIngredienteOpen,
    onOpen: onIngredienteOpen,
    onClose: onIngredienteClose,
  } = useDisclosure();

  const {
    isOpen: isAdicionOpen,
    onOpen: onAdicionOpen,
    onClose: onAdicionClose,
  } = useDisclosure();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      ingredientes: selectedIngredientes, // Actualizamos los ingredientes seleccionados
      adiciones: selectedAdiciones, // Actualizamos las adiciones seleccionadas
    }));

    try {
      if (formData.id_producto !== 0) {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/productos/update/${formData.id_producto}`,
          formData
        );
        console.log("Datos del producto enviados:", response.data);
        if (response.data.cod == 1) {
          fetchProducts();
        }
      } else {
        // Enviar los datos al backend
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/productos/create`,
          formData
        );
        console.log("Datos del producto enviados:", response.data);
        if (response.data.cod == 1) {
          fetchProducts();
        }
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  const fetchData = async () => {
    try {
      const categoryResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/${
          session?.bussines || session?.user?.bussines
        }`
      );
      const ingredientesResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/productos/getVariatios/1/${
          session?.bussines || session?.user?.bussines
        }`
      );
      const adicionesResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/productos/getVariatios/2/${
          session?.bussines || session?.user?.bussines
        }`
      );
      setCategorias(categoryResponse.data.data);
      setIngredientes(ingredientesResponse.data.variaciones);
      setAdiciones(adicionesResponse.data.variaciones);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/productos/getProductWithBuss/${
          session?.bussines || session?.user?.bussines
        }`
      ); // Reemplaza con tu endpoint
      setProductos(response.data.data);
      setShowForm(false);
      showNotification("success", "Productos cargados correctamente");
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      showNotification("Error al cargar los productos", "error");
    }
  };

  const handleAddItem = async (type) => {
    try {
      const response = await axios.post(`/api/${type}`, { name: newItem });
      if (type === "ingredientes") {
        setIngredientes((prev) => [...prev, response.data]);
      } else {
        setAdiciones((prev) => [...prev, response.data]);
      }
      setNewItem("");
    } catch (error) {
      console.error("Error al agregar elemento:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/productos/getProductoByIdVariation/${id}`
      );
      const { producto, ingredientes, adiciones } = response.data.data;

      // Rellenar el formulario con los datos recibidos
      setFormData({
        ...producto,
        ingredientes: ingredientes,
        adiciones: adiciones,
      });
      const ingredientesIds = ingredientes.map((ing) => ing.id_variation);
      const adicionesIds = adiciones.map((adi) => adi.id_variation);

      // Actualizar el estado de una sola vez con todos los IDs
      setSelectedIngredientes(ingredientesIds);
      setSelectedAdiciones(adicionesIds);

      setIsLoading(false);
      setShowForm(true);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    console.log("Editar producto con ID:", id);
    // Aquí puedes agregar la lógica para editar el producto.
  };

  const toggleIngrediente = (id) => {
    if (selectedIngredientes.includes(id)) {
      setSelectedIngredientes(
        selectedIngredientes.filter((item) => item !== id)
      );
    } else {
      setSelectedIngredientes([...selectedIngredientes, id]);
    }
  };

  const toggleAdicion = (id) => {
    if (selectedAdiciones.includes(id)) {
      setSelectedAdiciones(selectedAdiciones.filter((item) => item !== id));
    } else {
      setSelectedAdiciones([...selectedAdiciones, id]);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/productos/delete/${id}`
      );
      if (response.data.code == 1) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error al agregar elemento:", error);
    }
    // Aquí puedes agregar la lógica para eliminar el producto.
  };

  // Consultar ingredientes y adiciones
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="projects-section">
        <div className="projects-section-header">
          <p>Productos</p>
          <p className="time"></p>
          {/* Botones superiores */}
          <HStack spacing={4} mb={4}>
            <Button
              bg="#4fc8dc"
              color="white"
              onClick={() => setShowForm(true)}
            >
              Crear Producto
            </Button>
            <Button colorScheme="orange" onClick={fetchProducts}>
              Ver Productos
            </Button>
          </HStack>
        </div>

        {showForm ? (
          <div className="project-boxes">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                {/* Nombre */}
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Descripción */}
                <FormControl>
                  <FormLabel>Descripción</FormLabel>
                  <Textarea
                    name="descripcion"
                    placeholder="Descripción del producto"
                    value={formData.descripcion}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Precio */}
                <FormControl isRequired>
                  <FormLabel>Precio</FormLabel>
                  <NumberInput min={0} precision={2}>
                    <NumberInputField
                      name="precio"
                      placeholder="Precio del producto"
                      value={formData.precio}
                      onChange={handleChange}
                    />
                  </NumberInput>
                </FormControl>

                {/* Stock */}
                {/* <FormControl isRequired>
                  <FormLabel>Stock</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField
                      name="stock"
                      placeholder="Cantidad disponible"
                      value={formData.stock}
                      onChange={handleChange}
                    />
                  </NumberInput>
                </FormControl> */}

                {/* Foto */}
                <FormControl>
                  <FormLabel>Foto</FormLabel>
                  <Input
                    name="foto"
                    type="url"
                    placeholder="URL de la imagen"
                    value={formData.foto}
                    onChange={handleChange}
                  />
                  {formData.foto && (
                    <Image
                      src={formData.foto}
                      alt="Vista previa"
                      mt="2"
                      boxSize="100px"
                    />
                  )}
                </FormControl>

                {/* Disponible */}
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Disponible</FormLabel>
                  <Switch
                    name="disponible"
                    isChecked={formData.disponible}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Categoría */}
                <FormControl isRequired>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    name="categoria"
                    placeholder="Selecciona una categoría"
                    value={formData.categoria}
                    onChange={handleChange}
                  >
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <HStack spacing={4} width="full">
                  <Button
                    colorScheme="orange"
                    width="full"
                    onClick={onIngredienteOpen}
                  >
                    Ingredientes
                  </Button>
                  <Button
                    bg="#4fc8dc"
                    color="white"
                    width="full"
                    onClick={onAdicionOpen}
                  >
                    Adiciones
                  </Button>
                </HStack>

                {/* Botón de envío */}
                <Button bg="#4fc8dc" color="white" type="submit" width="full">
                  Guardar Producto
                </Button>
              </VStack>
            </form>
          </div>
        ) : (
          <div className="project-boxes">
            <Table variant="striped" bg="#4fc8dc">
              <Thead>
                <Tr>
                  <Th>Imagen</Th>
                  <Th>Nombre</Th>
                  <Th>Precio</Th>
                  <Th>Categoría</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {productos.map((producto) => (
                  <Tr key={producto.id}>
                    <Td>
                      <Image
                        src={process.env.REACT_APP_API_URL_IMG + producto.image}
                        alt={producto.name}
                        boxSize="50px"
                        objectFit="cover"
                      />
                    </Td>
                    <Td>{producto.name}</Td>
                    <Td>{producto.price}</Td>
                    <Td>{producto.categoryId}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="Editar"
                          icon={<EditIcon />}
                          onClick={() => handleEdit(producto.id)}
                        />
                        <IconButton
                          bg="#ff6711"
                          aria-label="Eliminar"
                          icon={<DeleteIcon />}
                          onClick={() => handleDelete(producto.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        )}
        <Modal isOpen={isIngredienteOpen} onClose={onIngredienteClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ingredientes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    {/* <Th>ID</Th> */}
                    <Th>Nombre</Th>
                    <Th>Acción</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ingredientes.map((item) => (
                    <Tr
                      key={item.id_variation}
                      bg={
                        selectedIngredientes.includes(item.id_variation)
                          ? "green.200"
                          : ""
                      }
                    >
                      {/* <Td>{item.id_variation}</Td> */}
                      <Td>{item.name}</Td>
                      <Td>
                        <IconButton
                          icon={
                            selectedIngredientes.includes(item.id_variation) ? (
                              <DeleteIcon />
                            ) : (
                              <AddIcon />
                            )
                          }
                          aria-label="Agregar/Eliminar ingrediente"
                          onClick={() => toggleIngrediente(item.id_variation)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <FormControl mt={4}>
                <Input
                  placeholder="Nuevo ingrediente"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => handleAddItem("ingredientes")}
              >
                Agregar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Adiciones Modal */}
        <Modal isOpen={isAdicionOpen} onClose={onAdicionClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adiciones</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    {/* <Th>ID</Th> */}
                    <Th>Nombre</Th>
                    <Th>Valor</Th>
                    <Th>Acción</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {adiciones.map((item) => (
                    <Tr
                      key={item.id_variation}
                      bg={
                        selectedAdiciones.includes(item.id_variation)
                          ? "green.200"
                          : ""
                      }
                    >
                      {/* <Td>{item.id_variation}</Td> */}
                      <Td>{item.name}</Td>
                      <Td>{item.valor}</Td>
                      <Td>
                        <IconButton
                          icon={
                            selectedAdiciones.includes(item.id_variation) ? (
                              <DeleteIcon />
                            ) : (
                              <AddIcon />
                            )
                          }
                          aria-label="Agregar/Eliminar adición"
                          onClick={() => toggleAdicion(item.id_variation)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <FormControl mt={4}>
                <Input
                  placeholder="Nueva adición"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <Input
                  placeholder="Valor"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                onClick={() => handleAddItem("adiciones")}
              >
                Agregar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default Product;
