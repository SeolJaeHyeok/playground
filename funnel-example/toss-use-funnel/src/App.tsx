

import { useFunnel } from '@use-funnel/browser';
import { useCallback, useState } from 'react';


type B = {name?: string; age?: string; sex?: string; address?: string};
type C = {name: string; age?: string; sex?: string; address?: string};
type D = {name: string; age: string; sex?: string; address?: string};
type E = {name: string; age: string; sex: string; address?: string};



const FunnelExample = () => {
  const [state, setState] = useState({
    name: '',
    age: '',
    sex: '',
    address: ''
  }) 
    const funnel = useFunnel<{
      name: B,
      age: C,
      sex: D,
      address: E
      s: any
    }>({
        id: 'next',
        initial: {
            step: 'name',
            context: {},
        },
    });
   
    switch (funnel.step) {
      case 'name':
        return <ComponentA onClick={(name) => {
          setState(prev=> ({...prev, name}))
          funnel.history.push('age', {name})
        }} state={state}/>
      case 'age':
        return <ComponentB onClick={(age) => {
          setState(prev => ({...prev, age}))
          funnel.history.push('sex', {age})
        }} state={state}/>
      case 'sex':
        return <ComponentC onClick={(sex) => {
          setState(prev => ({...prev, sex}))
          funnel.history.push('address', {sex})
        }} state={state}/>
      case 'address':
        return <ComponentD onClick={(address) => {
          setState(prev => ({...prev, address}))
          funnel.history.push('s', {address})
        }} state={state}/>
      case 's':
        return <ComponentE state={state}/>
    }
};

const ComponentA = ({ onClick, state }: { onClick: (name: any) => void, state: B }) => {
    console.log('name',state)

    const [name, setName] = useState('');
    return (
        <>
            <h1>name</h1>
            <input onChange={(e) => setName(e.target.value)} />
            <button onClick={() => onClick(name)}>다음</button>
        </>
    );
};

const ComponentB = ({ onClick, state }: { onClick: (name: any) => void, state: C }) => {
    console.log('age',state)
    const [age, setAge] = useState('');
    return (
        <>
            <h1>age</h1>
            <input onChange={(e) => setAge(e.target.value)} />
            <button onClick={() => onClick(age)}>다음</button>
        </>
    );
};

const ComponentC = ({ onClick, state }: { onClick: (name: any) => void, state: D }) => {
    const [sex, setSex] = useState('');
    console.log('sex',state)

    return (
        <>
            <h1>sex</h1>
            <input onChange={(e) => setSex(e.target.value)} />
            <button onClick={() => onClick(sex)}>다음</button>
        </>
    );
};

const ComponentD = ({ onClick, state }: { onClick: (name: any) => void, state: E}) => {
    const [address, setAddress] = useState('');
    console.log('address',state)

    return (
        <>
            <h1>address</h1>
            <input onChange={(e) => setAddress(e.target.value)} />
            <button onClick={() => onClick(address)}>다음</button>
        </>
    );
};

const ComponentE = (props: any) => {
    
    return (
        <>
            <h2>{props.state.name}</h2>
            <h2>{props.state.age}</h2>
            <h2>{props.state.sex}</h2>
            <h2>{props.state.address}</h2>
        </>
    );
};

export default FunnelExample;
