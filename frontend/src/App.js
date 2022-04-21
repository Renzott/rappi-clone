import React, { useEffect, useState } from 'react';
import TodoAPIService from './service/TodoAPIService';

function App() {

  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const service = new TodoAPIService();

    (async () => {
      const response = await service.getAllTodos();

      const data = response.data;

      setTodo(data);
    })();

  }, []);

  const renderTodo = () => {
    return todo.map((todo, index) => {

      function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, '0');  
        };
        return `#${f(0)}${f(8)}${f(4)}`;
      }
      
      const scale = {
        min: {value: -20, hue: 1},
        max: {value: 55, hue: 245}
      } 
      
      function temperatureToColor(temp){
         temp = Math.min(scale.max.value, Math.max(scale.min.value, temp));
         const range = scale.max.value - scale.min.value;
         const hueRange = scale.max.hue - scale.min.hue;
         const value =  (temp - scale.min.value) / range;
         const hue = scale.max.hue - hueRange * value;
         
         return hslToHex(hue, 100, 50)
      }

      return (
        <div key={index} style={{ backgroundColor : temperatureToColor(todo.temperatureC) }}>
          <h3>{todo.summary}</h3>
          <p>{todo.temperatureC}</p>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1>Todo Lists</h1>
      {renderTodo()}
    </div>
  );
}

export default App;
