import React, { useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';
import './style.scss';

const TodoItem = (props) => {

    const { item, updateTodo, removeTodo, completeTodo } = props;

    const inputRef = useRef(true);

    const handleEdit = () => {
        inputRef.current.disabled = false;
        inputRef.current.focus();
    }

    const handleUpdate = (id, value, e) => {
        if (e.which === 13) {
            updateTodo({
                id,
                item: value
            });
            inputRef.current.disabled = true;
        }
    }

    return (
        <motion.li
            initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
            animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
            whileHover={{
                scale: 0.9,
                transition: { type: "spring", duration: 0.5 },
            }}
            exit={{
                x: "-60vw",
                scale: [1, 0],
                transition: { duration: 0.5 },
                backgroundColor: "rgba(255,0,0,1)",
            }}
            key={item.id}
            className="card"
        >
            <textarea
                ref={inputRef}
                disabled={inputRef}
                defaultValue={item.item}
                onKeyPress={(e) => handleUpdate(item.id, inputRef.current.value, e)}
            />
            <div className="btns">
                <button onClick={handleEdit}>
                    <AiFillEdit />
                </button>

                {item.completed === false &&
                    <button onClick={() => completeTodo(item)}>
                        <IoCheckmarkDoneSharp color="green" />
                    </button>
                }

                <button onClick={() => removeTodo(item.id)}>
                    <IoClose color="red" />
                </button>
            </div >

            {item.completed === true && <span className="completed">done</span>}

        </motion.li >
    )
}


export default TodoItem;