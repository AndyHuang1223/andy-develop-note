---
title: "C#學習筆記-物件與類別(3)：成員概觀"
description: "類別的成員有許多，為了將類別設計圖變得更加完善，以下整理了官網內的 類別成員的概觀 (https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/classes-and-structs/members)。 ## 類別成員概觀： #"
publishDate: 2022-06-16
category: "C#學習筆記"
tags: ["C#","note"]
legacyPath: "/2022/06/16/C-學習筆記-物件與類別-3-：成員概觀/"
draft: false
---

類別的成員有許多，為了將類別設計圖變得更加完善，以下整理了官網內的[類別成員的概觀](https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/classes-and-structs/members)。
## 類別成員概觀：
### 欄位：
是在類別範圍中宣告的「變數」，一般而言，只針對具有 private 或 protected 存取範圍的變數使用欄位。
```csharp
public class MyClass
{
    private Date _date;
}
```
### 常數：
在編譯階段就設定好的欄位，使用`const`修飾詞所宣告。
```csharp
public class MyClass
{
    public const int Months = 12;
}
```
編譯後，會把Months通通替代為12，不能再做任何變更。

>當參照其他程式碼中所定義的常數值 (例如 DLL) 時，如果新版本的 DLL 定義常數的新值，則除非對新版本重新編譯新值，否則原本的程式仍會保留舊常值。

### 屬性：
在類別上的方法，可供存取，就像欄位一樣。屬性可以保護類別內的欄位，以免被外部修改。
- 屬性可讓類別公開取得和設定值的公用方式，同時隱藏實作或驗證程式碼。
- `get` 屬性存取子可用來傳回屬性值，而`set`屬性存取子則用來指派新值。 在 C# 9 和更新版本中， `init` 屬性存取子只會用來在物件建構期間指派新的值。 
- `value`關鍵字可用來定義 或 `init` 存取子所 `set` 指派的值。
- 屬性可以是「讀寫」(同時具有 `get` 和 `set` 存取子)、「唯讀」(具有 get 存取子但沒有 set 存取子) 或「唯寫」(具有 set 存取子但沒有 get 存取子)。 
- 不需要自訂存取子程式碼的簡單屬性，則可以實作為運算式主體定義或**自動實作屬性**。

#### 支援欄位的屬性
```csharp
public class MyClass
{
    
    private double _seconds;

    public double Hours
    {
       get { return _seconds / 3600; }
       set {
          if (value < 0 || value > 24)
             throw new ArgumentOutOfRangeException(
                   $"{nameof(value)} must be between 0 and 24.");

          _seconds = value * 3600;
       }
    }
}
```
#### 運算式主體定義
從 C# 6 開始，唯讀屬性可將`get` 存取子實作為運算式主體成員。 在此情況下，不會使用 `get` 存取子關鍵字和 `return` 關鍵字。

```csharp
public class MyPerson
{
    private string _firstName;
    private string _lastName;
    public MyPerson(string first, string last)
    {
        _firstName = first;
        _lastName = last;
    }
    //運算式主體定義
    public string Name => $"{_firstName} {_lastName}"
}
```
從 C# 7.0 開始，可同時將 `get` 和 `set` 存取子實作為運算式主體成員。 在此情況下，必須同時有 `get` 和 `set` 關鍵字。

```csharp
public class SaleItem
{
    string _name;
    decimal _cost;

    public SaleItem(string name, decimal cost)
    {
      _name = name;
      _cost = cost;
    }

    public string Name
    {
      get => _name;
      set => _name = value;
    }

    public decimal Price
    {
      get => _cost;
      set => _cost = value;
    }
}
```
#### 自動實作屬性
如果屬性同時具有 `get` 和 `set` (或 `get` 和 和 `init`) 存取子，則必須自動實作兩者。 您可以使用 `get` 和 `set` 關鍵字，但不提供任何實作，來定義自動實作屬性。

讓 SaleItem 物件現在會透過呼叫無參數建構函式和 物件初始化運算式來初始化。

```csharp
public class SaleItem
{
    public string Name
    { get; set; }

    public decimal Price
    { get; set; }
}
```

### 方法：
方法是在類別、結構或介面中宣告，方法是指定存取層級（例如`public`或`private` ）、選擇性修飾詞（ 例如`sealed` ）、傳回值、方法的名稱，以及任何方法參數。 這些部份放在一起即為方法的簽章。
```csharp
abstract class Motorcycle
{
    // 所有人都可以呼叫（public）
    public void StartEngine() 
    {
        
    }

    // 只有衍生類別可以呼叫(protected)
    protected void AddGas(int gallons) 
    { 
        
        
    }

    // 衍生類別可以覆寫或不覆寫(virtual)
    public virtual int Drive(int miles, int speed) 
    { 
        return 1; 
    }

    // 衍生類別必須要覆寫產生實作(abstract)
    public abstract double GetTopSpeed();
}
```
#### 方法的參數與引數
```csharp
public void Caller()
{
    int num = 4;
    // 引數必須為 int 型別
    int productA = Square(num);
    
    int productB = Square(12);
}

//傳回值的型別為int，傳入的參數型別為int
int Square(int i)
{
    // i 為只存在這個方法的區域變數
    int input = i;
    return input * input;
}
```

### 事件：
可以讓類別或物件在某些相關的事情發生時，告知其他類別或物件。可以使用委派來定義和觸發事件。
傳送 (引發) 事件的類別稱為「發行者」，以及接收 (處理) 事件的類別，稱為「訂閱者」。

#### 事件概觀
- 發行者會判斷引發事件的時間，而訂閱者則決定要採取什麼動作來回應該事件。
- 一個事件可以有多個訂閱者， 而訂閱者可以處理來自多個發行者的多個事件。
- 沒有訂閱者的事件永遠不會被引發。
- 事件通常用於對使用者的動作 (例如在圖形化使用者介面內按一下按鈕或選取功能表) 發出信號。
- 當某事件擁有多個訂閱者時，便會在事件引發的同時叫用事件處理常式。
- 在 .NET 類別庫中，事件是以委派和 [EventArgs](https://docs.microsoft.com/zh-tw/dotnet/api/system.eventargs?view=net-6.0) 基類為基礎 [EventHandler](https://docs.microsoft.com/zh-tw/dotnet/api/system.eventhandler?view=net-6.0) 

```csharp
public class MyClass
{
    public event EventHandler SomethingChanged;
    
    private void OnSomethingChanged()
    {
        if(SomethingChanged != null)
        {
            SomethingChanged.Invoke(this, EventArgs.Empty);
        }
    }
}
```

### 運算子：
多載運算子視為類型成員，由內建型別提供。
- 算術運算子
- 比較運算子
- 相等運算子
- 使用 bool 運算元執行邏輯運算的布林邏輯運算子
- 使用整數型別運算元執行位或移位運算的位和移位運算子


### 索引子：
索引子可以讓物件利用與陣列類似的方式編製索引，不需明確指定型別或執行個體成員，就能設定或擷取已索引的值。 索引子和屬性類似，差異在於它們的存取子會採用參數。

- 索引子可以讓物件利用與陣列類似的方式編製索引。
- get 存取子會傳回值。 set 存取子會指派值。
- this 關鍵字是用來定義索引子。
- value 關鍵字是用來定義 存取子要指派的值。
- 索引子不一定要由整數值編製索引。您可自行決定如何定義特定的查詢機制。
- 索引子可以多載。
- 索引子可具有一個以上的型式參數，例如，存取二維陣列時。


### 建構函式：
建構函式是第一次建立物件時所呼叫的方法。 通常會用來初始化物件的資料，類別或結構可有使用不同引數的多個建構函式。
建構函式是名稱與其類別名稱相同的方法。其方法簽章只包含選擇性的 存取修飾詞、方法名稱和其參數清單，它不包含傳回型別。 
```csharp
public class Person
{
    private string _firstName;
    private string _lastName;
    
    public Person()
    {
        _firstName = "Default First Name";
        _lastName = "Default Last Name";
    }
    
    public Person(string first, string last)
    {
        _firstName = first;
        _lastName = last;
    }
    
    public string Name =>$"{_firstName} {_lastName}";

}
```

#### 靜態建構函式
- 類別或結構也可以有靜態建構函式，用來初始化類型的靜態成員。
- 靜態建構函式無參數。
- 如果未使用靜態的函式來初始化靜態欄位，編譯器會將靜態欄位初始化為其預設值。

```csharp
public class Adult
{
    private static int minumumAge;
    
    static Adult()
    {
        minumumAge = 18;
    }
}
```

### 完成項：
完成項是即將從記憶體中移除物件時，由執行階段執行引擎所呼叫的方法（無法主動呼叫）。它們通常用來確保任何必須發行的資源有受到妥善處理。
- 無法在結構中定義完成項。 它們只能與類別搭配使用。
- 一個類別只能有一個完成項。
- 無法繼承或多載完成項。
- 無法呼叫完成項。 會自動呼叫它們。
- 完成項不會接受修飾詞，也不會包含參數。

```csharp
class Car
{
    ~Car()  // finalizer
    {
        // cleanup statements...
    }
}
```

### 巢狀類別：
在類別內再定義類別，通常用於描述僅供該類型使用的這些物件。

```csharp
public class MyClass
{
    class Nested
    {
        
    }
}
```

## 參考資料
https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/classes-and-structs/members


> 本文同步發布在：[C#學習筆記-物件與類別(3)：成員概觀](https://blog.build-school.com/2022/06/16/c%e5%ad%b8%e7%bf%92%e7%ad%86%e8%a8%98-%e7%89%a9%e4%bb%b6%e8%88%87%e9%a1%9e%e5%88%a53%e6%88%90%e5%93%a1%e6%a6%82%e8%a7%80)
若對內容有任何疑問或內容有錯誤，歡迎在下方留言讓我知道，
或是來信: andyhuang@build-school.com
