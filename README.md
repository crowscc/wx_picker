# wx_picker
微信小程序 自定义多级级联picker

微信自带的picker竟然不支持级联操作，很奇怪，官方Demo里面的级联是switch实现的

使用示例在pages\pick_demo下


`<customerPicker dataList="{{dataList1}}" columns="1" textLength="18" bind:pickConfrim="pickConfrim">
</customerPicker>`


三个参数

dataList:数据(数据格式是参考vux的popup-picke，具体格式在示例的js文件中)

columns:列数

textLength:显示文字的长度

bind:pickConfrim:页面回调函数
