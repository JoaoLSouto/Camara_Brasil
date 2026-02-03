import {useState, useCallback} from 'react';

const Teste = () => {
    const [age, setAge] = useState(26);
    const [name, setName] = useState('João');

    const handleChangeName  = () => {
        setName( prev => prev === 'Lucas' ? 'João' : 'Lucas')
    }

    const handleChangeAge  = useCallback(() => {
        const newAge = 10 + age
        console.log('age atual:', age, newAge)
        setAge( prev => prev === 26 ? 32 : 26)
    }, [age])

    return (
        <div> 
            <p>
                Idade: {age}
            </p>
            <p>
                Nome: {name}
            </p>
            <button onClick={handleChangeName}> Alterar Nome</button>
            <button onClick={handleChangeAge}> Alterar Idade</button>
        </div>
    )
}

export { Teste }