import { FilterTitle, FilterDiv, FilterInput } from './Filter.styled';

const Filter = ({ filter, handleChange }) => (
  <FilterDiv>
    <FilterTitle>Find contacts by name</FilterTitle>
    <FilterInput
      type="text"
      name="filter"
      onChange={handleChange}
      value={filter}
    ></FilterInput>
  </FilterDiv>
);

export default Filter;
