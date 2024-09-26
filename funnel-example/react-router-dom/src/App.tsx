import { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';

type Payload = {
  name: string | null;
  age: number | null;
  address: string | null;
  etc?: string;
  image?: File
}

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step') || 'default';
  const [payload, setPayload] = useState<Payload>({
    name: null,
    age: null,
    address: null,
    etc: undefined,
    image: undefined
  })

  const handleInputChange = (key: keyof Payload, value: unknown) => {
    setPayload(prev => ({
      ...prev,
      [key]: value
    }))
  }
  

  console.log('payload',payload)
  return (
    <div>
      <button onClick={() => setSearchParams({step: 'name'})}>시작</button>
      <h1>Home Page</h1>
      {step === 'name' && <Name data={payload}  onInputChange={handleInputChange} />}
      {step === 'age' && <Age  data={payload} onInputChange={handleInputChange} />}
      {step === 'address' && <Address  data={payload} onInputChange={handleInputChange} />}
      {step === 'etc' && <Etc  data={payload} onInputChange={handleInputChange} />}
      {step === 'image' && <Image  data={payload} onInputChange={handleInputChange} />}
      {step === 'default' && <button onClick={() => alert(JSON.stringify(payload))}>제출</button>}
    </div>
  );
};

// Uncontrolled Component
const Name = ({data, onInputChange} : {data: Payload; onInputChange : (key: keyof Payload, value: string) => void}) => {
  const [_, setSearchParams] = useSearchParams();
  const name = useRef('');
  return (
    <div>
      <h2>Name</h2>
      {/* state를 사용하지 않고 ref를 통해 렌더링을 발생시키지 않으면서 값을 입력받기 떄문에 value가 아닌 defaultValue를 통해 값이 입력된 경우를 보여줄 수 있도록 설정*/}
      {/* ref가 아닌 state를 통해 관리한다면 value를 사용해도 된다. */}
      <input defaultValue={data.name ?? ""} onChange={(e) => name.current = e.target.value}/>
      <button onClick={() => {
        onInputChange('name', name.current)
        setSearchParams({ step: 'age' })
      }}>다음</button>
    </div>
  );
}
const Age = ({data, onInputChange} : {data: Payload; onInputChange : (key: keyof Payload, value: string) => void}) => {
  const [_, setSearchParams] = useSearchParams();
  const age = useRef('');
  
  return (
    <div>
     <h2>Age</h2>
      <input defaultValue={data.age ?? ''} onChange={(e) => age.current = e.target.value}/>
      <button onClick={() => {
        onInputChange('age', age.current)
        setSearchParams({ step: 'address' })
      }}
      >다음</button>
    </div>
  );
}
const Address = ({data, onInputChange} : {data: Payload; onInputChange : (key: keyof Payload, value: string) => void}) => {
  const [_, setSearchParams] = useSearchParams();
  const address = useRef('');

  return (
    <div>
      <h2>Address</h2>
      <input defaultValue={data.address ?? ''} type="text" onChange={(e) => address.current = e.target.value}/>
      <button onClick={() => {
        onInputChange('address', address.current)
        setSearchParams({ step: 'etc' })
      }}
      >다음</button>
    </div>
  );
}

const Etc = ({data, onInputChange} : {data: Payload; onInputChange : (key: keyof Payload, value: string) => void}) => {
  const [_, setSearchParams] = useSearchParams();
  const etc = useRef('');

  return (
    <div>
      <h2>Etc</h2>
      <input defaultValue={data.etc ?? ''} type="text" onChange={(e) => etc.current = e.target.value}/>
      <button onClick={() => {
        onInputChange('etc', etc.current)
        setSearchParams({ step: 'image' })}
      }>다음</button>
    </div>
  );
}

const Image = ({data, onInputChange} : {data: Payload; onInputChange : (key: keyof Payload, value: File | null) => void}) => {
  const [_, setSearchParams] = useSearchParams();
  const image = useRef(null);
  return (
    <div>
      <h2>Image</h2>
      <input type="file" onChange={(e) => image.current = image.current && e.target.files && e.target.files[0]}/>
      <button onClick={() => {
        onInputChange('image', image.current)
        setSearchParams({ step: 'default' })}
      }>다음</button>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
