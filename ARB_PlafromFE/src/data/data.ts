export const listModule = [
    {
      type: 1,
      id: 1,
      showFiller:true,
      parrent_title: 'Tài khoản',
      img: '/assets/images/account.png',
      listModuleDetails : [
        {
          type:2,
          id: '1',
          title:'Người dùng',
          img:'/assets/images/user_account.jpg',
          controller:'nguoidung'
        },
        {
          type:2,
          id: '2',
          title:'Phân quyền quản trị',
          img:'/assets/images/user_account.jpg',
          controller:'quantri'
        }
      ]
    },
    {
      type: 1,
      id: 2,
      showFiller:true,
      parrent_title: 'Thiết lập hệ thống',
      img: '/assets/images/hethong.png',
      listModuleDetails : [
        {
          type:2,
          id: '11',
          title:'Đơn vị tính',
          img:'/assets/images/donvitinh.png',
          controller:'donvitinh'
        },
        {
          type:2,
          id: '12',
          title:'Tiền tệ',
          img:'/assets/images/tien_te.png',
          controller:'tiente'
        }
      ]
    },
    {
      type: 1,
      id:3,
      showFiller:true,
      parrent_title: 'Hành chính nhân sự',
      img: '/assets/images/nhansu.png',
      listModuleDetails : [
        { 
          type:2,
          id: '21',
          title:'Phòng ban',
          img:'/assets/images/phongban.jpg',
          controller:'phongban'
        },
        { 
          type:2,
          id: '22',
          title:'Chức danh',
          img:'/assets/images/chucdanh.jpg',
          controller:'chucdanh'
        },
        { 
          type:2,
          id: '23',
          title:'Công ty',
          img:'/assets/images/congty.png',
          controller:'congty'
        },
        { 
          type:2,
          id: '24',
          title:'Phúc lợi',
          img:'/assets/images/phucloi.png',
          controller:'phucloi'
        },
        { 
          type:2,
          id: '25',
          title:'Tuyển dụng',
          img:'/assets/images/tuyendung.png',
          controller:'tuyendung'
        },
        { 
          type:2,
          id: '26',
          title:'Khoa',
          img:'/assets/images/khoa.png',
          controller:'khoa'
        }
      ]
    },
    {
      type: 1,
      id: 4,
      showFiller:true,
      parrent_title: 'Quản lý tin tức',
      img: '/assets/images/tintuc.png',
      listModuleDetails : [
        {
          type:2,
          id: '41',
          title:'Nhóm tin tức',
          img:'/assets/images/nhom_tin_tuc.png',
          controller:'nhomtintuc'
        },
        {
          type:2,
          id: '42',
          title:'Loại tin tức',
          img:'/assets/images/loai_tin_tuc.png',
          controller:'loaitintuc'
        },
        {
          type:2,
          id: '43',
          title:'Tin tức',
          img:'/assets/images/tin_tuc.png',
          controller:'Tintuc'
        }
      ]
    },
  ]

export const listQuyen = [
    {
      id: '1',
      title:'Người dùng',
      controller:'nguoidung'
    },
    {
      type:2,
      id: '2',
      title:'Phân quyền quản trị',
      controller:'quantri'
    },
    {
      type:2,
      id: '11',
      title:'Đơn vị tính',
      controller:'donvitinh'
    },
    {
      type:2,
      id: '12',
      title:'Tiền tệ',
      controller:'tiente'
    },
    { 
      type:2,
      id: '21',
      title:'Phòng ban',
      img:'/assets/images/phongban.jpg',
      controller:'phongban'
    },
    { 
      type:2,
      id: '22',
      title:'Chức danh',
      controller:'chucdanh'
    },
    { 
      type:2,
      id: '23',
      title:'Công ty',
      controller:'congty'
    },
    { 
      type:2,
      id: '24',
      title:'Phúc lợi',
      controller:'phucloi'
    },
    { 
      type:2,
      id: '25',
      title:'Tuyển dụng',
      controller:'tuyendung'
    },
    { 
      type:2,
      id: '26',
      title:'Khoa',
      controller:'khoa'
    },
    { 
      type:2,
      id: '41',
      title:'Nhóm tin tức',
      controller:'nhomtintuc'
    },
    { 
      type:2,
      id: '42',
      title:'Loại tin tức',
      controller:'loaitintuc'
    },
    { 
      type:2,
      id: '43',
      title:'Tin tức',
      controller:'tintuc'
    }
  ];