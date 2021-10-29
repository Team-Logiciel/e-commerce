import React, { useState} from "react";

const RadioBox = ({ prices , handleFilters }) => {
   
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value); //-> tous ce qu'on get sur le handelFilters qui vient de Shop(perent subcomponent)
        setValue(event.target.value); //-> update
    };

 // -> a chaque changement dans input, sera envoyer au parent (Shop)
    return prices.map((p, i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}  /* -> Permet de cocher 1 choix parmis les prix */
                type="radio"
                className="mr-2 ml-4"
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
};

    
export default RadioBox;