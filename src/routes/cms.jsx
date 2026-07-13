import { useEffect, useState } from "react";
import {FaEdit,FaTrash} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";



const CMS =() => {
    const [id, setId] = useState(null)
    const [idData, setIdData] = useState(null)
    

    // ___________Modal for add woods_________
    const [show, setShow] = useState(false);

    const handleClose= () => setShow(false);
    const handleShow= () => setShow(true);
    // ___________Modal for add woods_________


    // Modal for delete woods


    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete= () => setShowDelete(false);
    const handleShowDelete= (id) => {
        setId(id)
        setShowDelete(true);

    }


    // Modal for delete woods



     // Modal for edit woods

    
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit= () => setShowEdit(false);
    const handleShowEdit= (data) => {
        setIdData(data)
        setShowEdit(true);

    }


    // Modal for edit woods
    
    
     // GET API CALL

    const [data, setData] =useState(null);

    const callAPI = async () => {
        try {
            const response = await fetch("https://testbackend1-dqwh.onrender.com/api/woods",{
                method: "GET",
            });

            const result = await response.json();

            console.log(result);
            setData(result);
        } catch (error) {console.error(error);

        }
    };
    useEffect(() => {
        callAPI();
    },[]);

    // GET API CALL


    const[name, setName] =useState("")
    const [description, setDescription] = useState("")


    //  POST API CALL

    const callPostApi = async () => {
        try {
            const raw={
                name: name,
                type: "hardwood",
                origin: "USA",
                color: "Light Red",
                density: 770,
                pricePerUnit: 45.5,
                description: description,
                available: true,
            };

            const response = await fetch("https://testbackend1-dqwh.onrender.com/api/woods",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
               
            });

            if (!response.ok) {
                throw new Error("HTTP error! Status: ${response.status}")
            }

            const result =await response.json();

            console.log(result);
            handleClose();
            callAPI()
        } catch (error){
            console.error("Error:", error);
        }
    }

    //  POST API CALL

    // EDIT API CALL


      const callEditAPI = async () => {
        try {
            const raw={
                name: name,
                description: description,
            };

            const response = await fetch(`https://testbackend1-dqwh.onrender.com/api/woods/${idData._id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(raw),
            });

            if (!response.ok) {
                throw new Error("HTTP error! Status: ${response.status}")
            }

            const result =await response.json();

            console.log(result);
            handleCloseEdit();
            callAPI()
        } catch (error){
            console.error("Error:", error);
        }
     }

    // EDIT API CALL


    // DELETE API CALL


      const callDeleteAPI = async () => {
        try {
            
            const response = await fetch("https://testbackend1-dqwh.onrender.com/api/woods",{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(raw),
            });

            if (!response.ok) {
                throw new Error("HTTP error! Status: ${response.status}")
            }

            const result =await response.json();

            console.log(result);
            handleCloseDelete();
            callAPI()
        } catch (error){
            console.error("Error:", error);
        }
    }

    // DELETE API CALL




    return(
        <>
         <div className="table-top-container">
            <div className="table-wrapper">
                {/* Add woods button */}
                <button variant="primary" onClick={handleShow}>
                    Add Woods
                </button>
                 {/* Add woods button */}

                {/* _____________ to show get data from woods api _____________ */}
                <div className="table-container">
    < table className="custom-table">
         <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Color</th>
                <th>Density</th>
                <th>Origin</th>
                <th>Price Per Unit</th>
                <th style={{ textAlign: "center"}}>Actions</th>
            </tr>
         </thead>

         <tbody>
            {data?.map((item) =>(
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                        
                            <span
                            className="color-badge">
                                {item.color}
                            </span>
                    </td>
                    <td>{item.density}</td>
                    <td>{item.origin}</td>
                    <td>{item.pricePerUnit}</td>

                    <td className="action-buttons">
                        <button className="edit-btn" onClick={()=>handleShowEdit(item)}>
                            <FaEdit />
                            Edit
                            </button>
                        <button className="delete-btn" onClick={()=>handleShowDelete(item?._id)}>
                            <FaTrash />
                            Delete
                            </button>

                    </td>
                </tr>
            ))}
         </tbody>
    </table>            
            
                </div> 
                {/* _____________ to show get data from woods api _____________ */}
            </div>
         </div>


         {/* open modal for add woods */}

         <Modal show={show}onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Woods Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
                <hr />
                <label>Description</label>
                <input type="text" onChange={(e) => setDescription(e.target.value)} />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>callPostApi()}>
                    Save Changes
                </Button>

            </Modal.Footer>
            
         </Modal>

         {/* open modal for add woods */}



          {/* open modal for delete woods */}

         <Modal show={showDelete}onHide={handleCloseDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Delete this wood</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                </Button>
                <Button variant="primary" onClick={callDeleteAPI}>
                    Delete
                </Button>

            </Modal.Footer>
            
         </Modal>

         {/* open modal for delete woods */}




          {/* open modal for edit woods */}

         <Modal show={showEdit}onHide={handleCloseEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Edit this wood</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
                <hr />
                <label>Description</label>
                <input type="text" onChange={(e) => setDescription(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                    Close
                </Button>
                <Button variant="primary" onClick={callEditAPI}>
                    Edit
                </Button>

            </Modal.Footer>
            
         </Modal>

         {/* open modal for edit woods */}
        </>
    )
}

export default CMS;




// import { useEffect, useState } from "react";
// import {FaEdit,FaTrash} from "react-icons/fa";


// const CMS =() => {
    
//     const [data,setData] = useState(null);

//     const callAPI = async () => {
//         try {
//             const response = await fetch("https://jsonplaceholder.typicode.com/todos",{
//                 method: "GET",
//             });

//             const result = await response.json();

//             console.log(result);
//             setData(result);
//         } catch (error) {console.error(error);

//         }
//     };
//     useEffect(() => {
//         callAPI();
//     },[]);

//     return(
//         <>
//         <div className="table-top-container">
//             <div className="table-container">
//     < table className="custom-table">
//          <thead>
//             <tr>
//                 <th>userId</th>
//                 <th>id</th>
//                 <th>title</th>
//                 <th>completed</th>
//             </tr>
//          </thead>

//          <tbody>
//             {data?.map((item) =>(
//                 <tr key={item.id}>
//                     <td>{item.userId}</td>
//                     <td>{item.id}</td>
//                     <td>{item.title}</td>
//                     <td>{item.completed ? "True" : "False"}</td>

                    
//                 </tr>
//             ))}
//          </tbody>
//     </table>            
// </div>
//         </div>
//         </>
//     )
// }

// export default CMS;







