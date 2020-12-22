import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { fetchUniversityAction } from "state/ducks/common/actions/home-page";
import homepageQueries from "query/homepage";
//material-ui
import Slider from "@material-ui/core/Slider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const marks = [
  {
    value: 0,
    label: "0 tr",
  },
  {
    value: 40,
    label: "40 tr",
  },
  {
    value: 80,
    label: "80 tr",
  },

];

function FilterBar() {
  const [items, setItems] = useState({
    first: 5,
    skip: 0,
  });
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(
    homepageQueries.GET_ALL_UNIVERSITY,
    {
      variables: items,
    }
  );
  const dataApi = !loading && !error && !!data && data.allUniversities;

  // const state = useSelector((state) => state);

  const addItem = (event) => {
    event.preventDefault();
    dispatch(fetchUniversityAction(dataApi));
    console.log("ITEMS", items);
  };

  const handleOnChange = (e) => {
    console.log(e.target.name, ": ", e.target.value)
    setItems({
      ...items,
      [e.target.name]: e.target.value,
    });

  };
  useEffect(() => { }, [dispatch, items]);

  // console.log("SELECTOR", state);

  return (
    <div id="filter">
      <a href="/" className="map d-block text-center">
        <i className="fas fa-map-marked-alt"></i> Xem vị trí
      </a>
      <form action="" className="filter-form" onSubmit={addItem}>
        <fieldset>
          <legend>Tìm kiếm theo vùng</legend>
          <label className="locate d-block">
            <input
              type="radio"
              id="bac"
              name="zone"
              value="Mien Bac"
              onChange={handleOnChange}
            />
            <label htmlFor="bac">Miền Bắc</label>
          </label>
          <label className="locate d-block">
            <input
              type="radio"
              id="trung"
              name="zone"
              value="Mien Trung"
              onChange={handleOnChange}
            />
            <label htmlFor="trung">Miền Trung</label>
          </label>
          <label className="locate d-block">
            <input
              type="radio"
              id="nam"
              name="zone"
              value="Mien Nam"
              onChange={handleOnChange}
            />
            <label htmlFor="nam">Miền Nam</label>
          </label>
        </fieldset>
        {/* <!-- -----------end tìm kiếm theo vùng---------- -->  */}

        <fieldset>
          <legend>Nhóm ngành</legend>
          <select
            id="nhomNghanh"
            className="form-control"
            name="name_major"
            onChange={handleOnChange}
          >
            <option value="">Tất cả</option>
            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
            <option >Sản xuất và chế biến</option>
            <option >Kiến trúc và xây dựng</option>
            <option value="Kinh doanh">Kinh doanh</option>
            <option>Công nghệ - thông tin</option>
            <option value="Luật">Luật - nhân văn</option>
            <option >Nghệ thuật - thẩm mỹ - đồ họa</option>
            <option>Báo chí - khoa học và xã hội</option>
            <option >Khoa học cơ bản</option>
            <option >Sư phạm</option>
            <option >Nông - lâm - ngư nghiệp</option>
            <option value="Y học">Y học</option>


          </select>
        </fieldset>
        {/* <!-- -----------end nhóm nghành---------- --> */}
        {/* <fieldset>
          <legend>Chuyên ngành</legend>
          <label htmlFor="nhomNghanh" className="locate d-block margin-r-10">
            <select name="nhomNghanh" id="nhomNghanh" className="form-control">
              <option value="">Tất cả nghành</option>
            </select>
          </label>
        </fieldset> */}
        {/* <!-- end ngành  -->  */}

        <fieldset>
          <legend>Loại trường</legend>
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Đại học công lập"
          />

          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Đại học tư thục"
          />

          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Cao đẳng"
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Đào tạo nghề"
          />
        </fieldset>
        {/* <!-- end --> */}
        <fieldset>
          <legend>Mức học phí</legend>
          <Slider
            defaultValue={20}
            // getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={10}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </fieldset>

        <button className="btn btn-outline-success btn-loc">Lọc</button>
      </form>
    </div>
  );
}

export default FilterBar;
