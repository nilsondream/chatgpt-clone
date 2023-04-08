import React from 'react'
import { Info, Plus, SignOut, Sun, Trash, User } from 'phosphor-react'

const buttons = [
    { id: 1, text: 'Borrar conversaciones', icon: <Trash /> },
    { id: 2, text: 'Actualizar a Plus', icon: <User />, up: 'Nuevo' },
    { id: 3, text: 'Modo claro', icon: <Sun /> },
    { id: 4, text: 'Pedir ayuda', icon: <Info /> },
    { id: 5, text: 'Cerrar sesión', icon: <SignOut /> },
]

const Sidebar = () => {
    return (
        <aside className='sidebar-styled'>
            <div className='sidebar-top'>
                <button>
                    <Plus />
                    Nuevo chat
                </button>
            </div>

            <div className='sidebar-bottom'>
                <span className='line' />
                {
                    buttons.map((btn) => (
                        <button key={btn.id}>
                            {btn.icon}
                            {btn.text}
                            {btn.up && <span>{btn.up}</span>}
                        </button>
                    ))
                }
            </div>
        </aside>
    )
}

export default Sidebar