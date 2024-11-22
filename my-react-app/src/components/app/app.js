import { Component } from "react";

import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import AppInfo from "../app-info/app-info";
import EmployeersList from "../employees-list/employees-list";
import EmployeersAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "John C.", salary: 800, increase: false, star: true, id: 1 },
        { name: "Alex M.", salary: 3000, increase: true, star: false, id: 2 },
        { name: "Carl W.", salary: 500, increase: false, star: false, id: 3 },
      ],
      term: '',
      filter: 'all'
    };
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((item) => item.id !== id),
    }));
  };
  addItem = (name, salary) => {
    const newItem = {
        name, 
        salary,
        increase: false,
        star:false,
        id: this.maxId++
    }
    this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
            data: newArr
        }
    });
}

  onToggleIncrease = (id) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

      const old = data[index];
      const newItem = {...old, increase: !old.increase};
      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return{
        data: newArr
      } 
    })
  }
  onToggleStar = (id) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

      const old = data[index];
      const newItem = {...old, star: !old.star};
      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return{
        data: newArr
      } 
    })
  }

  serachEmp = (items, term) => {
    if(term.length === 0){
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

    onUpdateSearch = (term) => {
      this.setState({term});
    }

    filterPost = (items, filter) => {
      switch(filter){
        case 'star':
          return items.filter(item => item.star);
        case 'moreThen1000':
          return items.filter(item => item.salary > 1000)
        default:
          return items
      }
    }

    onFilterSelect = (filter) => {
      this.setState({filter})
    }

  render() {

    const{data, term, filter} = this.state
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length
    const visibleData = this.filterPost(this.serachEmp(data, term), filter)
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch ={this.onUpdateSearch}/>
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
        </div>
        <EmployeersList 
        data={visibleData} 
        onDelete={this.deleteItem}
        onToggleIncrease={this.onToggleIncrease} 
        onToggleStar={this.onToggleStar}/>
        <EmployeersAddForm  onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
