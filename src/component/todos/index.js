import React, { useState } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import { addTodos } from '../../redux/reducer';
import DisplayTodo from '../display-todo';
import { GoPlus } from 'react-icons/go'
import { motion } from 'framer-motion';

const mapStateToProps = (state) => {
    return {
        todos: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (obj) => dispatch(addTodos(obj)),
    };
}

const Todos = (props) => {
    const [todo, setTodo] = useState('');

    const handleChange = (event) => {
        setTodo(event.target.value);
    }

    const handleKeyPress = (e) => {
        if(e.which === 13) {
            handleAdd();
        }
    }

    const handleAdd = () => {

        if (todo === '') {
            alert('Input is Empty');
        } else {
            props.addTodo({
                id: Math.floor(Math.random() * 1000),
                item: todo,
                completed: false
            });
            setTodo('');
        }
    }

    return (
        <div className='addTodos'>
            <input
                className='todo-input'
                type={'text'}
                onChange={handleChange}
                onKeyPress={(e) => handleKeyPress(e)}
                value={todo}
            />
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='add-btn'
                onClick={handleAdd}
            >
                <GoPlus />
            </motion.button>
            <br />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
