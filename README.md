# bo-ng-xsl
Convert HTML Basic TAG to HTML Bootstrap Struct using XSLT and Angular JS

For example: INPUT

```html
<input ng-model="pivot.attr" ng-view="pivot.switch" title="Input Attr" ui-layout="{}"/>
```
Apply XSLT 

```html
<span class="input-group" ng-view="pivot.switch">
  <label>Input Attr</label>
  <input ng-model="pivot.attr" title="Input Attr"/>
</span>
```


For example: SELECT

```html
<select ng-model="pivot.attr" ng-view="pivot.switch" title="Select Attr" ui-layout="{}">
  <option ng-repeat="item in items" value="{{item}}">{{item.description}}</option>
</select>
```
Apply XSLT 

```html
<span class="input-group">
  <a class="form-control" href="#" data-toggle="dropdown" aria-expanded="false">
    <span class="form-control-staticx ng-binding">
      Select Attr<span class="caret"></span>
    </span>
  </a>
  <span aria-hidden="true" class="glyphicon glyphicon-ok form-control-feedback"></span>
  <select ui-layout="" ng-model="pivot.attr" class="dropdown-menu ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched" size="10">
    <option ng-repeat="item in items" value="{{item}}">{{item.description}}</option>
  </select>
</span>
```

This code is only example for how to convert 
