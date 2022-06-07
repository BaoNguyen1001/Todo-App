import React, { useState } from "react";
import { connect } from "react-redux";
import {
    addTodos,
    updateTodos,
    removeTodos,
    completeTodos
} from '../../redux/reducer';
import TodoItem from "../todo-item";
import { motion, AnimatePresence } from 'framer-motion';
import './style.scss';

const mapStateToProps = (state) => {
    return {
        todos: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (obj) => dispatch(addTodos(obj)),
        updateTodo: (obj) => dispatch(updateTodos(obj)),
        completeTodo: (obj) => dispatch(completeTodos(obj)),
        removeTodo: (id) => dispatch(removeTodos(id))
    };
}

const DisplayTodo = (props) => {

    const [sort, setSort] = useState('active')

    return (
        <div className="display-todo">
            <div className="btns">


                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="active-btn"
                    onClick={() => setSort('active')}
                >
                    Active
                </motion.button>


                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="completed-btn"
                    onClick={() => setSort('completed')}
                >
                    Completed
                </motion.button>


                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="all-btn"
                    onClick={() => setSort('all')}
                >
                    All
                </motion.button>


            </div>


            <ul>
                <AnimatePresence>
                    {props.todos.length > 0 && sort === 'active'
                        ? props.todos.map((item) => {
                            return (
                                item.completed === false && (
                                    <TodoItem
                                        key={item.id}
                                        item={item}
                                        removeTodo={props.removeTodo}
                                        updateTodo={props.updateTodo}
                                        completeTodo={props.completeTodo}
                                    />
                                )
                            )
                        })
                        : null
                    }

                    {props.todos.length > 0 && sort === 'completed'
                        ? props.todos.map((item) => {
                            return (
                                item.completed === true && (
                                    <TodoItem
                                        key={item.id}
                                        item={item}
                                        removeTodo={props.removeTodo}
                                        updateTodo={props.updateTodo}
                                        completeTodo={props.completeTodo}
                                    />
                                )
                            )
                        })
                        : null
                    }

                    {props.todos.length > 0 && sort === 'all'
                        ? props.todos.map((item) => {
                            return (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    removeTodo={props.removeTodo}
                                    updateTodo={props.updateTodo}
                                    completeTodo={props.completeTodo}
                                />
                            )
                        })
                        : null
                    }

                </AnimatePresence>
            </ul>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodo);
