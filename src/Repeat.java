public class Repeat {
    
    public static int rep(int[] a, int l, int r, int v){
        int mid = (l+r)/2;
        if (a[mid] == a[mid+1] || a[mid] == a[mid-1]){
            v= a[mid];
        }
        rep(a, l, mid, v);
        rep(a, mid+1, r, v);

        return v;
    }

    public static void main(String[] args){
        int[] i = {1,2,3,4,5,6,6};
        
        System.out.println(rep(i, 0, 6, 0));

    }
}
