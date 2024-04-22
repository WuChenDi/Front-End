# MYSQL的DML语句基本操作

## 插入数据语法：

```sql
insert into 表名称 (字段名称，字段名1，字段名2，....字段名n) values (值1,值2,....值n)
```

Demo1: 向`testdb`中的`t_user`表插入一条数据(针对所有字段而言)

```sql
insert into t_user (user_name,user_birthday,user_gender,user_state,user_height,user_decribe) values ('gerry','2017-09-05','男',1,174.7,'gerry是朝夕Java学院讲师');
简写: (前提插入的数据对应表中所有的字段)
insert into t_user values (2,'gerry1','2017-09-05','男',1,174.7,'gerry是朝夕Java学院讲师');
```

Demo2:  向`testdb`中的`t_user`表插入指定列的值【注意指定列插入数据前提是其他列没有非空的约束】

```sql
insert into t_user (user_name,user_state,user_height,user_decribe) values ('tom',1,178.2,'tomcat');
```

## 修改表中数据的语法

```sql
update 表名 set 字段1=修改的值1,字段2=修改的值2,......字段n=修改的值n where 修改条件
```

Demo1：修改t_user表中的生日字段

```sql
update t_user set user_birthday='2000-10-20' where user_id = 1;
```

Demo2：修改t_user表user_id为2的 身高 176.3，状态字段 2

```sql
update t_user set user_height = 176.3,user_state=2 where user_id=2;

注意: 修改多个字段时sql语句中字段需要用","号隔开
```

Demo3: 修改t_user表中user_id 大于 1的 user_state字段的值为7

```sql
update t_user set user_state = 7 where user_id > 1;
```

Demo4: 如果修改数据的时候不加条件，就会导致所有数据都会被更改，这样数据就有问题啦

```sql
update t_user set user_state = 5;
```

## 删除表中数据的语法

```sql
delete from 表名 where 删除的条件
```

Demo1： 删除user_id为3的数据

```sql
delete from t_user where user_id = 3;
```

Demo2: 删除性别为女，状态为5的用户信息 (多个条件同事满足就删除)

```sql
delete from t_user where user_gender='女' and user_state=5;
```

Demo3： 删除user_state为10或者性别为男的记录

```sql
delete from t_user where user_state = 10 or user_gender='男';
```
