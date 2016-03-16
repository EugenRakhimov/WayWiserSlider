  var money_amount;

  function checkValueLess(value, dif1, dif2)
  {
    if (( (value + dif2) < 0) && ((value + dif1) < 0))
    {
      return false
    }    
    return true
  }
  
  function checkValueMore(value, dif1, dif2)
  {
    if (((value+dif1) > 900)&&((value1+dif2) > 900))
    {
      return false
    }
    return true
  }

  function setValues(id1,id2,value1,value2, dif1, dif2)
  { 
    while (!checkValueLess(value2, dif1, dif2) || !checkValueMore(value1,dif1,dif2))  
    {
      value2 = value2 +1
      value1 = value1 - 1 
    }
    while (!checkValueLess(value1, dif1, dif2) || !checkValueMore(value2,dif1,dif2))  
    {
      value1 = value1 +1
      value2 = value2 -1
    }
    if(( (value2 + dif2) >= 0)&&((value2+dif2)<=900))
    {
      $(id1).slider("value",value1+dif1)
      $(id2).slider("value",value2+dif2)
    }
    else
    {
      $(id1).slider("value",value1+dif2)
      $(id2).slider("value",value2+dif1)
    }
    setMoney()
  }
  function setAmount(id, restMoney)
  {
    var personAmount = Math.round(($( id ).slider( "value" )/900)*restMoney*100)/100
    $(id+"-amount").val("$"+personAmount) 
  }
  function setMoney()
  { 
    var comissionAmount = Math.round(money_amount * 0.03*100)/100
    var restMoney = money_amount - comissionAmount
    $("#comission-amount").val("$"+comissionAmount) 
    setAmount("#person1", restMoney)
    setAmount("#person2", restMoney)
    setAmount("#person3", restMoney)
  }
  function redistributeMoney(event,ui) {
    var person1 = $( "#person1" ).slider( "value" ),
    person2 = $( "#person2" ).slider( "value" ),
    person3 = $( "#person3" ).slider( "value" ),
    comission = $( "#comission" ).slider( "value" )
    change = 900 - person1 - person2 - person3
    var dif = Math.round((change/2))
    var dif2 = change-dif   
    if (ui.handle.parentNode.id == "person1") 
    { 
      setValues("#person2","#person3",person2,person3, dif,dif2)
    }
    if (ui.handle.parentNode.id == "person2"){
      setValues("#person1","#person3",person1,person3, dif,dif2)
    }
    if (ui.handle.parentNode.id == "person3"){
      setValues("#person1","#person2",person1,person2, dif,dif2)
    }
  }
  function setActive(element)
  {
    money_amount =parseFloat($(element).val().replace("$",""))
    $(element).removeClass( "btn-primary" )
    $(element).addClass("btn-success")
    setMoney()
  }
  function resetElements()
  {
    $("#8, #12, #25, #custom-amount").removeClass( "btn-success" )
    $("#8, #12, #25, #custom-amount").addClass("btn-primary")
  }

  $(function initSliders() {
    $( "#person1, #person2, #person3" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 900,
      value: 127,
      slide: redistributeMoney,
      stop: redistributeMoney
    });
    $( "#comission" ).slider({
      orientation: "horizontal",
      disabled: true,
      range: "min",
      max: 900,
      value: 27
    });
    $( "#person1" ).slider( "value", 300 );
    $( "#person2" ).slider( "value", 300 );
    $( "#person3" ).slider( "value", 300 );
    $( "#comission").slider( "value", 27 );
    setActive("#12")  
  });
$(function selectAmountByClick(){
  $("#8, #12, #25").click(function(event) {
    event.preventDefault();    
    $("#custom-amount").val("")
    resetElements()
    setActive(this)
  });

})
$(function selectAmountByTyping(){
  $("#custom-amount").click(function(event) {
    event.preventDefault();
    resetElements()
    $(this).removeClass( "btn-primary" )
    $(this).val("$"+money_amount);
  });

})
$(function leaveSelectAmount(){
  $("#custom-amount").focusout(function(event) {
    current_value = parseFloat($(this).val().replace("$",""))
    if (current_value) {
      money_amount = current_value
      $(this).val("$"+money_amount);
      setMoney()
    }
    else
    {
      alert("You should set amount of money")
    }
  })
})